"use server";

import OpenAI from "openai";

export type GenerateApplicationParams = {
	error: null | string;
	applicationText: string;
};

export const generateApplicationAction = async (
	initialState: GenerateApplicationParams,
	formData: FormData,
) => {
	const job_title = formData.get("job_title") as string;
	const company = formData.get("company") as string;
	const good_at = formData.get("good_at") as string;
	const aditional_info = formData.get("additional_info") as string;

	try {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const response = await openai.responses.create({
			prompt: {
				id: "pmpt_691866f79c408195ba2832e224f6c0d200608513f89e95e4",
				version: "1",
				variables: {
					job_title: job_title,
					company: company,
					good_at: good_at,
					aditional_info: aditional_info,
				},
			},
		});

		return {
			error: null,
			applicationText: response.output_text,
		};
	} catch (error) {
		console.error("Error generating application:", error);
		return {
			...initialState,
			error: "Failed to generate application. Please try again.",
		};
	}
};
