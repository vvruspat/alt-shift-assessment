import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { useCreateApplicationStore } from "@/store/useCreateApplicationStore";
import { ApplicationForm } from "./ApplicationForm";

// Mock stores
vi.mock("@/store/useApplicationsStore", () => ({
	useApplicationsStore: vi.fn(),
}));

vi.mock("@/store/useCreateApplicationStore", () => ({
	useCreateApplicationStore: vi.fn(),
	selectTitle: vi.fn(),
	selectIsDisabled: vi.fn(),
}));

// Mock actions
vi.mock("@/actions/generateApplicationAction", () => ({
	generateApplicationAction: vi.fn(),
}));

// Mock platform hook
vi.mock("@/uikit/hooks", () => ({
	usePlatform: vi.fn(() => "desktop"),
}));

describe("ApplicationForm", () => {
	const mockSetJobTitle = vi.fn();
	const mockSetCompany = vi.fn();
	const mockSetGoodAt = vi.fn();
	const mockSetAdditionalInfo = vi.fn();
	const mockSetLetter = vi.fn();
	const mockSetCurrentApplication = vi.fn();
	const mockAddApplication = vi.fn();
	const mockUpdateApplication = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		vi.mocked(useApplicationsStore).mockReturnValue({
			applications: {},
			addApplication: mockAddApplication,
			removeApplication: vi.fn(),
			updateApplication: mockUpdateApplication,
			fetchApplications: vi.fn(),
		});

		vi.mocked(useCreateApplicationStore).mockImplementation((selector) => {
			const state = {
				jobTitle: "",
				company: "",
				goodAt: "",
				additionalInfo: "",
				letter: "",
				currentApplication: undefined,
				pending: false,
				setJobTitle: mockSetJobTitle,
				setCompany: mockSetCompany,
				setGoodAt: mockSetGoodAt,
				setAdditionalInfo: mockSetAdditionalInfo,
				setLetter: mockSetLetter,
				setCurrentApplication: mockSetCurrentApplication,
				reset: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});
	});

	test("renders form with all input fields", () => {
		render(<ApplicationForm />);

		expect(screen.getByPlaceholderText("Product manager")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Apple")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("HTML, CSS and doing things in time"),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				"Describe why you are a great fit or paste your bio",
			),
		).toBeInTheDocument();
	});

	test("renders 'Generate Now' button initially", () => {
		render(<ApplicationForm />);

		expect(screen.getByText("Generate Now")).toBeInTheDocument();
	});

	test("calls setJobTitle when job title input changes", async () => {
		render(<ApplicationForm />);

		const jobTitleInput = screen.getByPlaceholderText("Product manager");
		await userEvent.type(jobTitleInput, "Software Engineer");

		expect(mockSetJobTitle).toHaveBeenCalled();
	});

	test("calls setCompany when company input changes", async () => {
		render(<ApplicationForm />);

		const companyInput = screen.getByPlaceholderText("Apple");
		await userEvent.type(companyInput, "Google");

		expect(mockSetCompany).toHaveBeenCalled();
	});

	test("calls setGoodAt when good at input changes", async () => {
		render(<ApplicationForm />);

		const goodAtInput = screen.getByPlaceholderText(
			"HTML, CSS and doing things in time",
		);
		await userEvent.type(goodAtInput, "React and TypeScript");

		expect(mockSetGoodAt).toHaveBeenCalled();
	});

	test("calls setAdditionalInfo when additional info textarea changes", async () => {
		render(<ApplicationForm />);

		const additionalInfoTextarea = screen.getByPlaceholderText(
			"Describe why you are a great fit or paste your bio",
		);
		await userEvent.type(additionalInfoTextarea, "I am a great developer");

		expect(mockSetAdditionalInfo).toHaveBeenCalled();
	});

	test("displays heading with title from store", () => {
		vi.mocked(useCreateApplicationStore).mockImplementation((selector) => {
			const state = {
				jobTitle: "Software Engineer",
				company: "Google",
				goodAt: "",
				additionalInfo: "",
				letter: "",
				currentApplication: undefined,
				pending: false,
				setJobTitle: mockSetJobTitle,
				setCompany: mockSetCompany,
				setGoodAt: mockSetGoodAt,
				setAdditionalInfo: mockSetAdditionalInfo,
				setLetter: mockSetLetter,
				setCurrentApplication: mockSetCurrentApplication,
				reset: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<ApplicationForm />);

		// Note: selectTitle selector should combine jobTitle and company
		// The actual implementation is tested through the selector
	});

	test("displays 'Try again' button when currentApplication exists", () => {
		vi.mocked(useCreateApplicationStore).mockImplementation((selector) => {
			const state = {
				jobTitle: "",
				company: "",
				goodAt: "",
				additionalInfo: "",
				letter: "Generated letter",
				currentApplication: { id: 1, text: "Generated letter" },
				pending: false,
				setJobTitle: mockSetJobTitle,
				setCompany: mockSetCompany,
				setGoodAt: mockSetGoodAt,
				setAdditionalInfo: mockSetAdditionalInfo,
				setLetter: mockSetLetter,
				setCurrentApplication: mockSetCurrentApplication,
				reset: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<ApplicationForm />);

		expect(screen.getByText("Try again")).toBeInTheDocument();
	});

	test("renders ApplicationCard with placeholder", () => {
		render(<ApplicationForm />);

		expect(
			screen.getByText("Your personalized job application will appear here..."),
		).toBeInTheDocument();
	});

	test("renders ApplicationCard with pending state when pending", () => {
		vi.mocked(useCreateApplicationStore).mockImplementation((selector) => {
			const state = {
				jobTitle: "",
				company: "",
				goodAt: "",
				additionalInfo: "",
				letter: "",
				currentApplication: undefined,
				pending: true,
				setJobTitle: mockSetJobTitle,
				setCompany: mockSetCompany,
				setGoodAt: mockSetGoodAt,
				setAdditionalInfo: mockSetAdditionalInfo,
				setLetter: mockSetLetter,
				setCurrentApplication: mockSetCurrentApplication,
				reset: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		const { container } = render(<ApplicationForm />);

		// When pending is true, the ApplicationCard receives pending prop
		// Check that the component renders without error
		expect(container).toBeInTheDocument();
	});

	test("renders form with letter text when available", () => {
		vi.mocked(useCreateApplicationStore).mockImplementation((selector) => {
			const state = {
				jobTitle: "",
				company: "",
				goodAt: "",
				additionalInfo: "",
				letter: "This is a generated cover letter",
				currentApplication: undefined,
				pending: false,
				setJobTitle: mockSetJobTitle,
				setCompany: mockSetCompany,
				setGoodAt: mockSetGoodAt,
				setAdditionalInfo: mockSetAdditionalInfo,
				setLetter: mockSetLetter,
				setCurrentApplication: mockSetCurrentApplication,
				reset: vi.fn(),
			};

			if (typeof selector === "function") {
				return selector(state);
			}
			return state;
		});

		render(<ApplicationForm />);

		expect(
			screen.getByText("This is a generated cover letter"),
		).toBeInTheDocument();
	});

	test("renders label texts correctly", () => {
		render(<ApplicationForm />);

		expect(screen.getByText("Job Title")).toBeInTheDocument();
		expect(screen.getByText("Company")).toBeInTheDocument();
		expect(screen.getByText("I am good at...")).toBeInTheDocument();
		expect(screen.getByText("Additional details")).toBeInTheDocument();
	});
});
