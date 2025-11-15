"use server";

import { createServiceClient } from "@/lib/supabase";
import { Application } from "@/types/application";

export const deleteApplicationAction = async (id: Application["id"]) => {
	const supabase = createServiceClient();

	const { data, error } = await supabase
		.from("applications")
		.delete()
		.eq("id", id);

	if (error) {
		console.error("Error deleting application:", error);
		throw new Error("Failed to delete application");
	}

	return data;
};
