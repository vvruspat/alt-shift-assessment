import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { addApplicationAction } from "@/actions/addApplicationAction";
import { deleteApplicationAction } from "@/actions/deleteApplicationAction";
import { getApplicationsAction } from "@/actions/getApplicationsAction";
import { updateApplicationAction } from "@/actions/updateApplicationAction";
import { Application } from "@/types/application";

type State = {
	applications: Record<string, Application>;
};

type Actions = {
	addApplication: (
		applicationText: Application["text"],
	) => Promise<Application>;
	removeApplication: (applicationId: Application["id"]) => void;
	updateApplication: (application: Application) => Promise<Application>;
	fetchApplications: () => Promise<Application[]>;
};

export const useApplicationsStore = create<State & Actions>()(
	immer((set) => ({
		applications: {},

		fetchApplications: async () => {
			const data = await getApplicationsAction();

			set((state) => {
				data.forEach((application) => {
					state.applications[application.id] = application;
				});
			});

			return data;
		},

		addApplication: async (applicationText: Application["text"]) => {
			const application = await addApplicationAction(applicationText);

			set((state) => {
				state.applications[application.id] = application;
			});

			return application;
		},

		removeApplication: async (applicationId: Application["id"]) => {
			await deleteApplicationAction(applicationId);

			set((state) => {
				delete state.applications[applicationId];
			});
		},

		updateApplication: async (application: Application) => {
			const app = await updateApplicationAction(application);

			set((state) => {
				state.applications[application.id] = application;
			});

			return app;
		},
	})),
);
