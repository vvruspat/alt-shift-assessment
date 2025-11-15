import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { Applications } from "./Applications";

// Mock the store
vi.mock("@/store/useApplicationsStore", () => ({
	useApplicationsStore: vi.fn(),
}));

// Mock constants
vi.mock("@/constants/applicationsGoal", () => ({
	APPLICATIONS_GOAL: 10,
}));

describe("Applications", () => {
	const mockFetchApplications = vi.fn();
	const mockRemoveApplication = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders ApplicationBanner when no applications", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {},
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		expect(screen.getByText("Hit your goal")).toBeInTheDocument();
	});

	test("renders ApplicationsList when applications exist", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {
					"1": { id: 1, text: "First application" },
					"2": { id: 2, text: "Second application" },
				},
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		expect(screen.getByText("First application")).toBeInTheDocument();
		expect(screen.getByText("Second application")).toBeInTheDocument();
	});

	test("renders both ApplicationsList and ApplicationBanner when under goal", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {
					"1": { id: 1, text: "Application 1" },
					"2": { id: 2, text: "Application 2" },
					"3": { id: 3, text: "Application 3" },
				},
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		// Should show both the list and the banner
		expect(screen.getByText("Application 1")).toBeInTheDocument();
		expect(screen.getByText("Hit your goal")).toBeInTheDocument();
	});

	test("does not render ApplicationBanner when goal is reached", () => {
		const applications: Record<string, { id: number; text: string }> = {};
		for (let i = 1; i <= 10; i++) {
			applications[i.toString()] = { id: i, text: `Application ${i}` };
		}

		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications,
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		expect(screen.queryByText("Hit your goal")).not.toBeInTheDocument();
	});

	test("calls fetchApplications on mount", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {},
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		expect(mockFetchApplications).toHaveBeenCalled();
	});

	test("passes removeApplication to ApplicationsList", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {
					"1": { id: 1, text: "Test application" },
				},
				addApplication: vi.fn(),
				removeApplication: mockRemoveApplication,
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Applications />);

		expect(screen.getByText("Test application")).toBeInTheDocument();
		// The delete button should be present, indicating onDelete was passed
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});
});
