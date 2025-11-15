// This store I need for persist application creation form data between page reloads

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
	jobTitle: string;
	company: string;
	goodAt: string;
	additionalInfo: string;
	letter: string;
	pending: boolean;
};

type Actions = {
	setJobTitle: (jobTitle: string) => void;
	setCompany: (company: string) => void;
	setGoodAt: (goodAt: string) => void;
	setAdditionalInfo: (additionalInfo: string) => void;
	setLetter: (letter: string) => void;
	reset: () => void;
};

const initialState: State = {
	jobTitle: "",
	company: "",
	goodAt: "",
	additionalInfo: "",
	letter: "",
	pending: false,
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

			setAdditionalInfo: (additionalInfo: string) =>
				set((state) => {
					state.additionalInfo = additionalInfo;
				}),

			setLetter: (letter: string) =>
				set((state) => {
					state.letter = letter;
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
	!(state.jobTitle && state.company && state.goodAt && state.additionalInfo);
