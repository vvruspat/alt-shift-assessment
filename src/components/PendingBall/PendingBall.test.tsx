import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { PendingBall } from "./PendingBall";

describe("PendingBall", () => {
	test("renders SVG pending ball", () => {
		const { container } = render(<PendingBall />);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "320");
		expect(svg).toHaveAttribute("height", "320");
	});

	test("contains circle elements", () => {
		const { container } = render(<PendingBall />);

		const circles = container.querySelectorAll("circle");
		expect(circles.length).toBeGreaterThan(0);
	});

	test("contains gradient definitions", () => {
		const { container } = render(<PendingBall />);

		const gradients = container.querySelectorAll("radialGradient");
		expect(gradients.length).toBeGreaterThan(0);
	});
});
