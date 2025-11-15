import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { useCreateApplicationStore } from "@/store/useCreateApplicationStore";
import { CreateNewApplicationButton } from "./CreateNewApplicationButton";

// Mock the store
vi.mock("@/store/useCreateApplicationStore", () => ({
	useCreateApplicationStore: vi.fn(),
}));

describe("CreateNewApplicationButton", () => {
	test("renders button with text", () => {
		const mockReset = vi.fn();
		vi.mocked(useCreateApplicationStore).mockReturnValue({
			reset: mockReset,
			jobTitle: "",
			company: "",
			goodAt: "",
			additionalInfo: "",
			letter: "",
			pending: false,
			setJobTitle: vi.fn(),
			setCompany: vi.fn(),
			setGoodAt: vi.fn(),
			setAdditionalInfo: vi.fn(),
			setLetter: vi.fn(),
			setCurrentApplication: vi.fn(),
		});

		render(<CreateNewApplicationButton href="/create" />);

		expect(screen.getByText("Create New")).toBeInTheDocument();
	});

	test("calls reset when clicked", async () => {
		const mockReset = vi.fn();
		vi.mocked(useCreateApplicationStore).mockReturnValue({
			reset: mockReset,
			jobTitle: "",
			company: "",
			goodAt: "",
			additionalInfo: "",
			letter: "",
			pending: false,
			setJobTitle: vi.fn(),
			setCompany: vi.fn(),
			setGoodAt: vi.fn(),
			setAdditionalInfo: vi.fn(),
			setLetter: vi.fn(),
			setCurrentApplication: vi.fn(),
		});

		render(<CreateNewApplicationButton href="/create" />);

		const button = screen.getByText("Create New");
		await userEvent.click(button);

		expect(mockReset).toHaveBeenCalled();
	});

	test("passes additional props to MLinkButton", () => {
		vi.mocked(useCreateApplicationStore).mockReturnValue({
			reset: vi.fn(),
			jobTitle: "",
			company: "",
			goodAt: "",
			additionalInfo: "",
			letter: "",
			pending: false,
			setJobTitle: vi.fn(),
			setCompany: vi.fn(),
			setGoodAt: vi.fn(),
			setAdditionalInfo: vi.fn(),
			setLetter: vi.fn(),
			setCurrentApplication: vi.fn(),
		});

		render(
			<CreateNewApplicationButton href="/create" mode="primary" size="xl" />,
		);

		expect(screen.getByText("Create New")).toBeInTheDocument();
	});
});
