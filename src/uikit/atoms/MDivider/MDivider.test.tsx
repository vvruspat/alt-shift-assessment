import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import MDivider from "./MDivider";

describe("MDivider", () => {
	test("render card", async () => {
		render(<MDivider data-testid="divider" />);
		expect(screen.getByTestId("divider")).toBeInTheDocument();
	});
});
