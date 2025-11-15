import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
	test("renders SVG logo", () => {
		const { container } = render(<Logo />);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "179");
		expect(svg).toHaveAttribute("height", "48");
	});

	test("logo contains correct number of path elements", () => {
		const { container } = render(<Logo />);

		const paths = container.querySelectorAll("path");
		expect(paths.length).toBeGreaterThan(0);
	});
});
