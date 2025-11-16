// This store I need for persist application creation form data between page reloads

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ADDITIONAL_INFO_LIMIT } from "@/constants/additionalInfoLimit";
import { Application } from "@/types/application";

type State = {
	jobTitle: string;
	company: string;
	goodAt: string;
	additionalInfo: string;
	letter: string;
	currentApplication?: Application;
	pending: boolean;
	errors?: Record<string, string>;
};

type Actions = {
	setJobTitle: (jobTitle: string) => void;
	setCompany: (company: string) => void;
	setGoodAt: (goodAt: string) => void;
	setAdditionalInfo: (additionalInfo: string) => void;
	setLetter: (letter: string) => void;
	setCurrentApplication: (application: Application) => void;
	reset: () => void;
};

const initialState: State = {
	jobTitle: "",
	company: "",
	goodAt: "",
	additionalInfo: "",
	letter: "",
	pending: false,
	currentApplication: undefined,
	errors: undefined,
};

export const useCreateApplicationStore = create<State & Actions>()(
	persist(
		immer((set) => ({
			...initialState,

			setJobTitle: (jobTitle: string) =>
				set((state) => {
					state.jobTitle = jobTitle;
				}),

			setCompany: (company: string) =>
				set((state) => {
					state.company = company;
				}),

			setGoodAt: (goodAt: string) =>
				set((state) => {
					state.goodAt = goodAt;
				}),

			setAdditionalInfo: (additionalInfo: string) => {
				set((state) => {
					state.additionalInfo = additionalInfo;
				});

				if (additionalInfo.length > ADDITIONAL_INFO_LIMIT) {
					set((state) => {
						if (!state.errors) {
							state.errors = {};
						}
						state.errors.additionalInfo = `Additional information cannot exceed ${ADDITIONAL_INFO_LIMIT} characters.`;
					});
				} else {
					set((state) => {
						if (state.errors) {
							delete state.errors.additionalInfo;
							if (Object.keys(state.errors).length === 0) {
								state.errors = undefined;
							}
						}
					});
				}
			},

			setLetter: (letter: string) =>
				set((state) => {
					state.letter = letter;
				}),

			setCurrentApplication: (application: Application) =>
				set((state) => {
					state.currentApplication = application;
				}),

			reset: () => set(initialState),
		})),
		{
			name: "create-application-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const selectTitle = (state: State) => {
	if (state.jobTitle && state.company) {
		return `${state.jobTitle}, ${state.company}`;
	} else if (state.jobTitle) {
		return state.jobTitle;
	} else if (state.company) {
		return state.company;
	}
	return "";
};

export const selectIsDisabled = (state: State) =>
	!(
		state.jobTitle &&
		state.company &&
		state.goodAt &&
		state.additionalInfo &&
		Object.keys(state.errors ?? {}).length === 0
	);
