import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { ApplicationCard } from "./ApplicationCard";

// Mock copyToClipboard utility
vi.mock("@/utils/copyToClipboard", () => ({
	copyToClipboard: vi.fn().mockResolvedValue(undefined),
}));

describe("ApplicationCard", () => {
	const mockApplication = {
		id: 1,
		text: "This is a test application text",
	};

	test("renders application text", () => {
		render(<ApplicationCard application={mockApplication} />);

		expect(screen.getByText(mockApplication.text)).toBeInTheDocument();
	});

	test("renders placeholder when no text", () => {
		const placeholder = "No application text available";
		render(
			<ApplicationCard
				application={{ id: 1, text: "" }}
				placeholder={placeholder}
			/>,
		);

		expect(screen.getByText(placeholder)).toBeInTheDocument();
	});

	test("shows delete button when onDelete is provided", () => {
		const handleDelete = vi.fn();
		render(
			<ApplicationCard application={mockApplication} onDelete={handleDelete} />,
		);

		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	test("calls onDelete when delete button is clicked", async () => {
		const handleDelete = vi.fn();
		render(
			<ApplicationCard application={mockApplication} onDelete={handleDelete} />,
		);

		const deleteButton = screen.getByText("Delete");
		await userEvent.click(deleteButton);

		expect(handleDelete).toHaveBeenCalledWith(mockApplication.id);
	});

	test("shows copy to clipboard button when text exists", () => {
		render(<ApplicationCard application={mockApplication} />);

		expect(screen.getByText("Copy to clipboard")).toBeInTheDocument();
	});

	test("changes to 'Copied!' when copy button is clicked", async () => {
		const { copyToClipboard } = await import("@/utils/copyToClipboard");
		render(<ApplicationCard application={mockApplication} />);

		const copyButton = screen.getByText("Copy to clipboard");
		await userEvent.click(copyButton);

		expect(copyToClipboard).toHaveBeenCalledWith(mockApplication.text);
		expect(screen.getByText("Copied!")).toBeInTheDocument();
	});

	test("reverts from 'Copied!' after timeout", async () => {
		render(<ApplicationCard application={mockApplication} />);

		const copyButton = screen.getByText("Copy to clipboard");
		await userEvent.click(copyButton);

		expect(screen.getByText("Copied!")).toBeInTheDocument();

		// Wait for the timeout to complete (2000ms + buffer)
		await waitFor(
			() => {
				expect(screen.getByText("Copy to clipboard")).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);
	});
	test("renders pending state", () => {
		render(<ApplicationCard application={mockApplication} pending={true} />);

		// Should not show text or footer buttons when pending
		expect(screen.queryByText(mockApplication.text)).not.toBeInTheDocument();
		expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument();
		expect(screen.queryByText("Delete")).not.toBeInTheDocument();
	});

	test("does not render expandable text when expandable is false", () => {
		render(
			<ApplicationCard application={mockApplication} expandable={false} />,
		);

		expect(screen.getByText(mockApplication.text)).toBeInTheDocument();
	});

	test("does not show copy button when text is empty", () => {
		render(<ApplicationCard application={{ id: 1, text: "" }} />);

		expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument();
	});
});
