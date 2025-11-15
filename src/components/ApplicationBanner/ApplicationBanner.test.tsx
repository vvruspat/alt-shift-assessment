import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { ApplicationBanner } from "./ApplicationBanner";

// Mock the store
vi.mock("@/store/useApplicationsStore", () => ({
	useApplicationsStore: vi.fn(),
}));

// Mock constants
vi.mock("@/constants/applicationsGoal", () => ({
	APPLICATIONS_GOAL: 10,
}));

describe("ApplicationBanner", () => {
	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {},
				addApplication: vi.fn(),
				removeApplication: vi.fn(),
				updateApplication: vi.fn(),
				fetchApplications: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});
	});

	test("renders banner with heading", () => {
		render(<ApplicationBanner />);

		expect(screen.getByText("Hit your goal")).toBeInTheDocument();
	});

	test("renders description text", () => {
		render(<ApplicationBanner />);

		expect(
			screen.getByText(/Generate and send out couple more job applications/i),
		).toBeInTheDocument();
	});

	test("renders create new button", () => {
		render(<ApplicationBanner />);

		expect(screen.getByText("Create New")).toBeInTheDocument();
	});

	test("displays correct progress when no applications", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {},
				addApplication: vi.fn(),
				removeApplication: vi.fn(),
				updateApplication: vi.fn(),
				fetchApplications: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<ApplicationBanner />);

		expect(screen.getByText("0 out of 10")).toBeInTheDocument();
	});

	test("displays correct progress with applications", () => {
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {
					"1": { id: 1, text: "App 1" },
					"2": { id: 2, text: "App 2" },
					"3": { id: 3, text: "App 3" },
				},
				addApplication: vi.fn(),
				removeApplication: vi.fn(),
				updateApplication: vi.fn(),
				fetchApplications: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<ApplicationBanner />);

		expect(screen.getByText("3 out of 10")).toBeInTheDocument();
	});
});
