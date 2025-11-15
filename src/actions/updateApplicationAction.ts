"use server";

import { createServiceClient } from "@/lib/supabase";
import { Application } from "@/types/application";

export const updateApplicationAction = async (application: Application) => {
	const supabase = createServiceClient();

	const { data, error } = await supabase
		.from("applications")
		.update({
			text: application.text,
		})
		.eq("id", application.id)
		.select()
		.single();

	if (error) {
		console.error("Error update application:", error);
		throw new Error("Failed to update application");
	}

	return data;
};
