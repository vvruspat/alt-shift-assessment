import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { Page } from "./Page";

describe("Page", () => {
	test("renders children", () => {
		render(
			<Page>
				<div>Page Content</div>
			</Page>,
		);

		expect(screen.getByText("Page Content")).toBeInTheDocument();
	});

	test("renders header when provided", () => {
		render(
			<Page header={<h1>Page Header</h1>}>
				<div>Content</div>
			</Page>,
		);

		expect(screen.getByText("Page Header")).toBeInTheDocument();
	});

	test("renders actions when provided", () => {
		render(
			<Page actions={<button type="button">Action Button</button>}>
				<div>Content</div>
			</Page>,
		);

		expect(screen.getByText("Action Button")).toBeInTheDocument();
	});

	test("renders both header and actions", () => {
		render(
			<Page
				header={<h1>Header</h1>}
				actions={<button type="button">Action</button>}
			>
				<div>Content</div>
			</Page>,
		);

		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	test("renders without header and actions", () => {
		render(
			<Page>
				<div>Only Content</div>
			</Page>,
		);

		expect(screen.getByText("Only Content")).toBeInTheDocument();
	});

	test("passes props to main element", () => {
		const { container } = render(
			<Page data-testid="main-page" className="custom-class">
				<div>Content</div>
			</Page>,
		);

		const main = container.querySelector("main");
		expect(main).toBeInTheDocument();
		expect(main).toHaveClass("custom-class");
		expect(main).toHaveAttribute("data-testid", "main-page");
	});
});
