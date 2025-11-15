import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Application } from "@/types/application";
import { useApplicationsStore } from "./useApplicationsStore";

// Mock the actions
vi.mock("@/actions/addApplicationAction");
vi.mock("@/actions/deleteApplicationAction");
vi.mock("@/actions/getApplicationsAction");
vi.mock("@/actions/updateApplicationAction");

import { addApplicationAction } from "@/actions/addApplicationAction";
import { deleteApplicationAction } from "@/actions/deleteApplicationAction";
import { getApplicationsAction } from "@/actions/getApplicationsAction";
import { updateApplicationAction } from "@/actions/updateApplicationAction";

describe("useApplicationsStore", () => {
	beforeEach(() => {
		// Reset store state before each test
		useApplicationsStore.setState({ applications: {} });
		vi.clearAllMocks();
	});

	afterEach(() => {
		// Clear localStorage after each test
		localStorage.clear();
	});

	describe("fetchApplications", () => {
		it("should fetch and store applications", async () => {
			const mockApplications: Application[] = [
				{ id: 1, text: "Application 1" },
				{ id: 2, text: "Application 2" },
				{ id: 3, text: "Application 3" },
			];

			vi.mocked(getApplicationsAction).mockResolvedValue(mockApplications);

			const { fetchApplications } = useApplicationsStore.getState();
			const result = await fetchApplications();

			expect(getApplicationsAction).toHaveBeenCalledOnce();
			expect(result).toEqual(mockApplications);

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({
				1: mockApplications[0],
				2: mockApplications[1],
				3: mockApplications[2],
			});
		});

		it("should handle empty applications list", async () => {
			vi.mocked(getApplicationsAction).mockResolvedValue([]);

			const { fetchApplications } = useApplicationsStore.getState();
			const result = await fetchApplications();

			expect(result).toEqual([]);
			expect(useApplicationsStore.getState().applications).toEqual({});
		});

		it("should replace existing applications when fetching", async () => {
			// Set initial state
			useApplicationsStore.setState({
				applications: {
					1: { id: 1, text: "Old Application" },
				},
			});

			const newApplications: Application[] = [
				{ id: 2, text: "New Application" },
			];

			vi.mocked(getApplicationsAction).mockResolvedValue(newApplications);

			const { fetchApplications } = useApplicationsStore.getState();
			await fetchApplications();

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({
				2: newApplications[0],
			});
			expect(state.applications[1]).toBeUndefined();
		});
	});

	describe("addApplication", () => {
		it("should add a new application", async () => {
			const newApplication: Application = {
				id: 1,
				text: "New Application",
			};

			vi.mocked(addApplicationAction).mockResolvedValue(newApplication);

			const { addApplication } = useApplicationsStore.getState();
			const result = await addApplication("New Application");

			expect(addApplicationAction).toHaveBeenCalledWith("New Application");
			expect(result).toEqual(newApplication);

			const state = useApplicationsStore.getState();
			expect(state.applications[1]).toEqual(newApplication);
		});

		it("should add multiple applications", async () => {
			const app1: Application = { id: 1, text: "App 1" };
			const app2: Application = { id: 2, text: "App 2" };

			vi.mocked(addApplicationAction)
				.mockResolvedValueOnce(app1)
				.mockResolvedValueOnce(app2);

			const { addApplication } = useApplicationsStore.getState();
			await addApplication("App 1");
			await addApplication("App 2");

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({
				1: app1,
				2: app2,
			});
		});
	});

	describe("removeApplication", () => {
		it("should remove an application", async () => {
			const applications = {
				1: { id: 1, text: "Application 1" },
				2: { id: 2, text: "Application 2" },
			};

			useApplicationsStore.setState({ applications });

			vi.mocked(deleteApplicationAction).mockResolvedValue(null);

			const { removeApplication } = useApplicationsStore.getState();
			await removeApplication(1);

			expect(deleteApplicationAction).toHaveBeenCalledWith(1);

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({
				2: applications[2],
			});
			expect(state.applications[1]).toBeUndefined();
		});

		it("should handle removing non-existent application", async () => {
			const applications = {
				1: { id: 1, text: "Application 1" },
			};

			useApplicationsStore.setState({ applications });

			vi.mocked(deleteApplicationAction).mockResolvedValue(null);

			const { removeApplication } = useApplicationsStore.getState();
			await removeApplication(999);

			expect(deleteApplicationAction).toHaveBeenCalledWith(999);

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual(applications);
		});

		it("should remove all applications one by one", async () => {
			const applications = {
				1: { id: 1, text: "App 1" },
				2: { id: 2, text: "App 2" },
				3: { id: 3, text: "App 3" },
			};

			useApplicationsStore.setState({ applications });

			vi.mocked(deleteApplicationAction).mockResolvedValue(null);

			const { removeApplication } = useApplicationsStore.getState();
			await removeApplication(1);
			await removeApplication(2);
			await removeApplication(3);

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({});
		});
	});

	describe("updateApplication", () => {
		it("should update an existing application", async () => {
			const originalApp: Application = { id: 1, text: "Original" };
			const updatedApp: Application = { id: 1, text: "Updated" };

			useApplicationsStore.setState({
				applications: { 1: originalApp },
			});

			vi.mocked(updateApplicationAction).mockResolvedValue(updatedApp);

			const { updateApplication } = useApplicationsStore.getState();
			const result = await updateApplication(updatedApp);

			expect(updateApplicationAction).toHaveBeenCalledWith(updatedApp);
			expect(result).toEqual(updatedApp);

			const state = useApplicationsStore.getState();
			expect(state.applications[1]).toEqual(updatedApp);
		});

		it("should add application if it doesn't exist when updating", async () => {
			const newApp: Application = { id: 1, text: "New Application" };

			useApplicationsStore.setState({ applications: {} });

			vi.mocked(updateApplicationAction).mockResolvedValue(newApp);

			const { updateApplication } = useApplicationsStore.getState();
			await updateApplication(newApp);

			const state = useApplicationsStore.getState();
			expect(state.applications[1]).toEqual(newApp);
		});

		it("should update multiple applications", async () => {
			const apps = {
				1: { id: 1, text: "App 1" },
				2: { id: 2, text: "App 2" },
			};

			useApplicationsStore.setState({ applications: apps });

			const updated1: Application = { id: 1, text: "Updated 1" };
			const updated2: Application = { id: 2, text: "Updated 2" };

			vi.mocked(updateApplicationAction)
				.mockResolvedValueOnce(updated1)
				.mockResolvedValueOnce(updated2);

			const { updateApplication } = useApplicationsStore.getState();
			await updateApplication(updated1);
			await updateApplication(updated2);

			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({
				1: updated1,
				2: updated2,
			});
		});
	});

	describe("persistence", () => {
		it("should initialize with empty applications", () => {
			const state = useApplicationsStore.getState();
			expect(state.applications).toEqual({});
		});
	});
});
