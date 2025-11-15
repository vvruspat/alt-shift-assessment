import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Application } from "@/types/application";
import {
	selectIsDisabled,
	selectTitle,
	useCreateApplicationStore,
} from "./useCreateApplicationStore";

describe("useCreateApplicationStore", () => {
	beforeEach(() => {
		// Reset store to initial state before each test
		useCreateApplicationStore.getState().reset();
	});

	afterEach(() => {
		// Clear localStorage after each test
		localStorage.clear();
	});

	describe("initial state", () => {
		it("should have correct initial values", () => {
			const state = useCreateApplicationStore.getState();

			expect(state.jobTitle).toBe("");
			expect(state.company).toBe("");
			expect(state.goodAt).toBe("");
			expect(state.additionalInfo).toBe("");
			expect(state.letter).toBe("");
			expect(state.pending).toBe(false);
			expect(state.currentApplication).toBeUndefined();
		});
	});

	describe("setJobTitle", () => {
		it("should update job title", () => {
			const { setJobTitle } = useCreateApplicationStore.getState();

			setJobTitle("Software Engineer");

			const state = useCreateApplicationStore.getState();
			expect(state.jobTitle).toBe("Software Engineer");
		});

		it("should update job title multiple times", () => {
			const { setJobTitle } = useCreateApplicationStore.getState();

			setJobTitle("Developer");
			expect(useCreateApplicationStore.getState().jobTitle).toBe("Developer");

			setJobTitle("Senior Developer");
			expect(useCreateApplicationStore.getState().jobTitle).toBe(
				"Senior Developer",
			);
		});
	});

	describe("setCompany", () => {
		it("should update company", () => {
			const { setCompany } = useCreateApplicationStore.getState();

			setCompany("Tech Corp");

			const state = useCreateApplicationStore.getState();
			expect(state.company).toBe("Tech Corp");
		});

		it("should handle empty company name", () => {
			const { setCompany } = useCreateApplicationStore.getState();

			setCompany("Tech Corp");
			setCompany("");

			const state = useCreateApplicationStore.getState();
			expect(state.company).toBe("");
		});
	});

	describe("setGoodAt", () => {
		it("should update goodAt field", () => {
			const { setGoodAt } = useCreateApplicationStore.getState();

			setGoodAt("React and TypeScript");

			const state = useCreateApplicationStore.getState();
			expect(state.goodAt).toBe("React and TypeScript");
		});
	});

	describe("setAdditionalInfo", () => {
		it("should update additionalInfo field", () => {
			const { setAdditionalInfo } = useCreateApplicationStore.getState();

			setAdditionalInfo("I have 5 years of experience");

			const state = useCreateApplicationStore.getState();
			expect(state.additionalInfo).toBe("I have 5 years of experience");
		});
	});

	describe("setLetter", () => {
		it("should update letter field", () => {
			const { setLetter } = useCreateApplicationStore.getState();

			setLetter("Dear Hiring Manager...");

			const state = useCreateApplicationStore.getState();
			expect(state.letter).toBe("Dear Hiring Manager...");
		});
	});

	describe("setCurrentApplication", () => {
		it("should update current application", () => {
			const application: Application = {
				id: 1,
				text: "Application text",
			};

			const { setCurrentApplication } = useCreateApplicationStore.getState();

			setCurrentApplication(application);

			const state = useCreateApplicationStore.getState();
			expect(state.currentApplication).toEqual(application);
		});

		it("should replace existing application", () => {
			const app1: Application = { id: 1, text: "First" };
			const app2: Application = { id: 2, text: "Second" };

			const { setCurrentApplication } = useCreateApplicationStore.getState();

			setCurrentApplication(app1);
			expect(useCreateApplicationStore.getState().currentApplication).toEqual(
				app1,
			);

			setCurrentApplication(app2);
			expect(useCreateApplicationStore.getState().currentApplication).toEqual(
				app2,
			);
		});
	});

	describe("reset", () => {
		it("should reset all fields to initial state", () => {
			const {
				setJobTitle,
				setCompany,
				setGoodAt,
				setAdditionalInfo,
				setLetter,
				setCurrentApplication,
				reset,
			} = useCreateApplicationStore.getState();

			// Set all fields
			setJobTitle("Developer");
			setCompany("Tech Corp");
			setGoodAt("Coding");
			setAdditionalInfo("Info");
			setLetter("Letter");
			setCurrentApplication({ id: 1, text: "App" });

			// Reset
			reset();

			const state = useCreateApplicationStore.getState();
			expect(state.jobTitle).toBe("");
			expect(state.company).toBe("");
			expect(state.goodAt).toBe("");
			expect(state.additionalInfo).toBe("");
			expect(state.letter).toBe("");
			expect(state.pending).toBe(false);
			expect(state.currentApplication).toBeUndefined();
		});
	});

	describe("complete form filling scenario", () => {
		it("should handle filling out complete form", () => {
			const {
				setJobTitle,
				setCompany,
				setGoodAt,
				setAdditionalInfo,
				setLetter,
			} = useCreateApplicationStore.getState();

			setJobTitle("Frontend Developer");
			setCompany("Google");
			setGoodAt("React, TypeScript, Testing");
			setAdditionalInfo("Passionate about UI/UX");
			setLetter("Dear Google Team...");

			const state = useCreateApplicationStore.getState();
			expect(state.jobTitle).toBe("Frontend Developer");
			expect(state.company).toBe("Google");
			expect(state.goodAt).toBe("React, TypeScript, Testing");
			expect(state.additionalInfo).toBe("Passionate about UI/UX");
			expect(state.letter).toBe("Dear Google Team...");
		});
	});
});

describe("selectTitle", () => {
	beforeEach(() => {
		useCreateApplicationStore.getState().reset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it("should return job title and company when both are set", () => {
		const { setJobTitle, setCompany } = useCreateApplicationStore.getState();

		setJobTitle("Software Engineer");
		setCompany("Tech Corp");

		const state = useCreateApplicationStore.getState();
		expect(selectTitle(state)).toBe("Software Engineer, Tech Corp");
	});

	it("should return only job title when company is empty", () => {
		const { setJobTitle } = useCreateApplicationStore.getState();

		setJobTitle("Software Engineer");

		const state = useCreateApplicationStore.getState();
		expect(selectTitle(state)).toBe("Software Engineer");
	});

	it("should return only company when job title is empty", () => {
		const { setCompany } = useCreateApplicationStore.getState();

		setCompany("Tech Corp");

		const state = useCreateApplicationStore.getState();
		expect(selectTitle(state)).toBe("Tech Corp");
	});

	it("should return empty string when both are empty", () => {
		const state = useCreateApplicationStore.getState();
		expect(selectTitle(state)).toBe("");
	});
});

describe("selectIsDisabled", () => {
	beforeEach(() => {
		useCreateApplicationStore.getState().reset();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it("should return true when all required fields are empty", () => {
		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return true when only job title is set", () => {
		const { setJobTitle } = useCreateApplicationStore.getState();

		setJobTitle("Developer");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return true when only company is set", () => {
		const { setCompany } = useCreateApplicationStore.getState();

		setCompany("Tech Corp");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return true when only goodAt is set", () => {
		const { setGoodAt } = useCreateApplicationStore.getState();

		setGoodAt("React");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return true when only additionalInfo is set", () => {
		const { setAdditionalInfo } = useCreateApplicationStore.getState();

		setAdditionalInfo("Info");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return true when three fields are set but one is missing", () => {
		const { setJobTitle, setCompany, setGoodAt } =
			useCreateApplicationStore.getState();

		setJobTitle("Developer");
		setCompany("Tech Corp");
		setGoodAt("React");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(true);
	});

	it("should return false when all required fields are set", () => {
		const { setJobTitle, setCompany, setGoodAt, setAdditionalInfo } =
			useCreateApplicationStore.getState();

		setJobTitle("Developer");
		setCompany("Tech Corp");
		setGoodAt("React");
		setAdditionalInfo("Info");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(false);
	});

	it("should return false when all fields including optional letter are set", () => {
		const { setJobTitle, setCompany, setGoodAt, setAdditionalInfo, setLetter } =
			useCreateApplicationStore.getState();

		setJobTitle("Developer");
		setCompany("Tech Corp");
		setGoodAt("React");
		setAdditionalInfo("Info");
		setLetter("Letter");

		const state = useCreateApplicationStore.getState();
		expect(selectIsDisabled(state)).toBe(false);
	});
});
