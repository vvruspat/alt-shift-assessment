"use server";

import { createServiceClient } from "@/lib/supabase";

export const getApplicationsAction = async () => {
	const supabase = createServiceClient();

	const { data, error } = await supabase.from("applications").select("*");

	if (error) {
		console.error("Error get applications:", error);
		throw new Error("Failed get applications");
	}

	return data;
};
