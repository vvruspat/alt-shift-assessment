import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { ApplicationsList } from "./ApplicationsList";

describe("ApplicationsList", () => {
	const mockApplications = [
		{ id: 1, text: "First application" },
		{ id: 2, text: "Second application" },
		{ id: 3, text: "Third application" },
	];

	test("renders all applications", () => {
		const handleDelete = vi.fn();
		render(
			<ApplicationsList
				applications={mockApplications}
				onDelete={handleDelete}
			/>,
		);

		expect(screen.getByText("First application")).toBeInTheDocument();
		expect(screen.getByText("Second application")).toBeInTheDocument();
		expect(screen.getByText("Third application")).toBeInTheDocument();
	});

	test("renders empty list when no applications", () => {
		const handleDelete = vi.fn();
		const { container } = render(
			<ApplicationsList applications={[]} onDelete={handleDelete} />,
		);

		// Check that no application cards are rendered
		expect(
			container.querySelectorAll("[class*='applicationCard']").length,
		).toBe(0);
	});

	test("calls onDelete with correct id when delete is clicked", async () => {
		const handleDelete = vi.fn();
		render(
			<ApplicationsList
				applications={mockApplications}
				onDelete={handleDelete}
			/>,
		);

		const deleteButtons = screen.getAllByText("Delete");
		await userEvent.click(deleteButtons[0]);

		expect(handleDelete).toHaveBeenCalledWith(1);
	});

	test("renders correct number of application cards", () => {
		const handleDelete = vi.fn();
		render(
			<ApplicationsList
				applications={mockApplications}
				onDelete={handleDelete}
			/>,
		);

		const deleteButtons = screen.getAllByText("Delete");
		expect(deleteButtons).toHaveLength(3);
	});
});
