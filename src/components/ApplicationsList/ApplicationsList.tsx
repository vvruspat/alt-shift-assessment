"use client";
import { Application } from "@/types/application";
import { MGrid } from "@/uikit";
import { ApplicationCard } from "../ApplicationCard";

type ApplicationsListProps = {
	applications: Application[];
	onDelete: (id: Application["id"]) => void;
};

export const ApplicationsList = ({
	applications,
	onDelete,
}: ApplicationsListProps) => {
	return (
		<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="2xl">
			{applications.map((application) => (
				<ApplicationCard
					key={application.id}
					application={application}
					onDelete={onDelete}
				/>
			))}
		</MGrid>
	);
};

export default ApplicationsList;
