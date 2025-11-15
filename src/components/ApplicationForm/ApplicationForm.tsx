"use client";

import {
	type ChangeEvent,
	FormEvent,
	useActionState,
	useEffect,
	useState,
} from "react";
import { generateApplicationAction } from "@/actions/generateApplicationAction";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import {
	selectIsDisabled,
	selectTitle,
	useCreateApplicationStore,
} from "@/store/useCreateApplicationStore";
import { Application } from "@/types/application";
import {
	MAlert,
	MButton,
	MDivider,
	MFlex,
	MFormField,
	MGrid,
	MHeading,
	MInput,
	MText,
	MTextarea,
} from "@/uikit";
import { ApplicationCard } from "../ApplicationCard";
import { FormSpinner } from "../FormSpinner";
import styles from "./ApplicationForm.module.css";

export const ApplicationForm = () => {
	const addApplication = useApplicationsStore((state) => state.addApplication);
	const updateApplication = useApplicationsStore(
		(state) => state.updateApplication,
	);

	const setJobTitle = useCreateApplicationStore((state) => state.setJobTitle);
	const setCompany = useCreateApplicationStore((state) => state.setCompany);
	const setGoodAt = useCreateApplicationStore((state) => state.setGoodAt);
	const setLetter = useCreateApplicationStore((state) => state.setLetter);
	const setAdditionalInfo = useCreateApplicationStore(
		(state) => state.setAdditionalInfo,
	);
	const letter = useCreateApplicationStore((state) => state.letter);
	const jobTitle = useCreateApplicationStore((state) => state.jobTitle);
	const company = useCreateApplicationStore((state) => state.company);
	const goodAt = useCreateApplicationStore((state) => state.goodAt);
	const additionalInfo = useCreateApplicationStore(
		(state) => state.additionalInfo,
	);

	const title = useCreateApplicationStore(selectTitle);
	const isDisabled = useCreateApplicationStore(selectIsDisabled);

	const [currentApplication, setCurrentApplication] = useState<Application>();

	const [state, formAction, pending] = useActionState(
		generateApplicationAction,
		{
			error: null,
			applicationText: letter,
		},
	);

	const onJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setJobTitle(e.target.value);
	};
	const onCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCompany(e.target.value);
	};
	const onGoodAtChange = (e: ChangeEvent<HTMLInputElement>) => {
		setGoodAt(e.target.value);
	};
	const onAdditionalInfoChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setAdditionalInfo(e.target.value);
	};

	const onSubmitClick = (e: FormEvent) => {
		if (pending) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	};

	useEffect(() => {
		if (state.applicationText && state.applicationText !== letter) {
			setLetter(state.applicationText);

			(async () => {
				const application = currentApplication
					? await updateApplication({
							id: currentApplication.id,
							text: state.applicationText,
						})
					: await addApplication(state.applicationText);

				setCurrentApplication(application);
			})();
		}
	}, [
		state.applicationText,
		letter,
		currentApplication,
		addApplication,
		updateApplication,
		setLetter,
	]);

	return (
		<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="xl">
			<form action={formAction}>
				<MFlex direction="column" gap="l" align="stretch">
					<MHeading mode="h1" className={styles.heading}>
						<MText mode={title ? "primary" : "secondary"} size="4xl">
							{title ? title : "New application"}
						</MText>
					</MHeading>
					<MDivider />

					{state.error && <MAlert mode="error">{state.error}</MAlert>}

					<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="xl">
						<MFormField
							control={
								<MInput
									name="job_title"
									placeholder="Product manager"
									value={jobTitle}
									onChange={onJobTitleChange}
								/>
							}
							label="Job Title"
							status="regular"
							direction="column"
							spacing="full"
						/>

						<MFormField
							control={
								<MInput
									name="company"
									placeholder="Apple"
									value={company}
									onChange={onCompanyChange}
								/>
							}
							label="Company"
							status="regular"
							direction="column"
							spacing="full"
						/>
					</MGrid>

					<MFormField
						control={
							<MInput
								name="good_at"
								placeholder="HTML, CSS and doing things in time"
								value={goodAt}
								onChange={onGoodAtChange}
							/>
						}
						label="I am good at..."
						status="regular"
						direction="column"
						spacing="full"
					/>

					<MFormField
						control={
							<MTextarea
								name="additional_info"
								placeholder="Describe why you are a great fit or paste your bio"
								counter={true}
								maxLength={1200}
								defaultValue={additionalInfo}
								counterPosition="outside"
								onChange={onAdditionalInfoChange}
								rows={9}
							/>
						}
						label="Additional details"
						status="regular"
						direction="column"
						spacing="full"
					/>

					<MButton
						type="submit"
						mode="primary"
						size="xl"
						stretch
						disabled={isDisabled}
						onClick={onSubmitClick}
					>
						{pending ? (
							<FormSpinner />
						) : currentApplication ? (
							"Try again"
						) : (
							"Generate Now"
						)}
					</MButton>
				</MFlex>
			</form>
			<ApplicationCard
				expandable={false}
				pending={pending}
				application={{
					id: 0,
					text: letter
						? letter
						: "Your personalized job application will appear here...",
				}}
			/>
		</MGrid>
	);
};
