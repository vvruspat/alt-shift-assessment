"use server";

import { createServiceClient } from "@/lib/supabase";

export const addApplicationAction = async (applicationText: string) => {
	const supabase = createServiceClient();

	const { data, error } = await supabase
		.from("applications")
		.insert({
			text: applicationText,
		})
		.select()
		.single();

	if (error) {
		console.error("Error adding application:", error);
		throw new Error("Failed to add application");
	}

	return data;
};
