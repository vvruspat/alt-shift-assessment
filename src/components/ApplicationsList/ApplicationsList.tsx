"use client";
import { Application } from "@/types/application";
import { MGrid } from "@/uikit";
import { ApplicationCard } from "../ApplicationCard";

type ApplicationsListProps = {
	applications: Application[];
};

export const ApplicationsList = ({ applications }: ApplicationsListProps) => {
	return (
		<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="2xl">
			{applications.map((application) => (
				<ApplicationCard
					key={application.id}
					application={application}
					onDelete={() => {}}
				/>
			))}
		</MGrid>
	);
};

export default ApplicationsList;
