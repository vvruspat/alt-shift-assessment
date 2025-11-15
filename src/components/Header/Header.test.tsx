import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { Header } from "./Header";

// Mock the store
vi.mock("@/store/useApplicationsStore", () => ({
	useApplicationsStore: vi.fn(),
}));

// Mock constants
vi.mock("@/constants/applicationsGoal", () => ({
	APPLICATIONS_GOAL: 10,
}));

describe("Header", () => {
	const mockFetchApplications = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// biome-ignore lint/suspicious/noExplicitAny: needed for mock selector
		vi.mocked(useApplicationsStore).mockImplementation((selector: any) => {
			const state = {
				applications: {},
				addApplication: vi.fn(),
				removeApplication: vi.fn(),
				updateApplication: vi.fn(),
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});
	});

	test("renders header element", () => {
		const { container } = render(<Header />);

		const header = container.querySelector("header");
		expect(header).toBeInTheDocument();
	});

	test("renders logo", () => {
		const { container } = render(<Header />);

		const logo = container.querySelector("svg");
		expect(logo).toBeInTheDocument();
	});

	test("displays correct progress text with no applications", () => {
		render(<Header />);

		expect(screen.getByText("0/10 applications generated")).toBeInTheDocument();
	});

	test("displays correct progress text with applications", () => {
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
				fetchApplications: mockFetchApplications,
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<Header />);

		expect(screen.getByText("3/10 applications generated")).toBeInTheDocument();
	});

	test("renders home button link", () => {
		const { container } = render(<Header />);

		const homeLink = container.querySelector('a[href="/"]');
		expect(homeLink).toBeInTheDocument();
	});

	test("calls fetchApplications on mount", () => {
		render(<Header />);

		expect(mockFetchApplications).toHaveBeenCalled();
	});
});
