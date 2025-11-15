"use client";

import { useEffect, useMemo } from "react";
import { ApplicationBanner } from "@/components/ApplicationBanner";
import { ApplicationsList } from "@/components/ApplicationsList";
import { APPLICATIONS_GOAL } from "@/constants/applicationsGoal";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { Application } from "@/types/application";

export const Applications = () => {
	const { applications, removeApplication, fetchApplications } =
		useApplicationsStore();

	useEffect(() => {
		fetchApplications();
	}, [fetchApplications]);

	const applicationsList = useMemo(
		() => Object.values(applications),
		[applications],
	);

	const onDelete = (id: Application["id"]) => {
		removeApplication(id);
	};

	return (
		<>
			{applicationsList.length > 0 && (
				<ApplicationsList applications={applicationsList} onDelete={onDelete} />
			)}
			{applicationsList.length < APPLICATIONS_GOAL && <ApplicationBanner />}
		</>
	);
};
