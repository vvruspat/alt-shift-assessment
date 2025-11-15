import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { FormSpinner } from "./FormSpinner";

describe("FormSpinner", () => {
	test("renders SVG spinner", () => {
		const { container } = render(<FormSpinner />);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "24");
		expect(svg).toHaveAttribute("height", "24");
	});

	test("contains path element for spinner icon", () => {
		const { container } = render(<FormSpinner />);

		const path = container.querySelector("path");
		expect(path).toBeInTheDocument();
	});
});
