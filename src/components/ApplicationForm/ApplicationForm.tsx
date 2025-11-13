"use client";

import {
	MButton,
	MDivider,
	MFlex,
	MFormField,
	MGrid,
	MHeading,
	MInput,
	MTextarea,
} from "@/uikit";
import { ApplicationCard } from "../ApplicationCard";

export const ApplicationForm = () => {
	return (
		<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="xl">
			<form>
				<MFlex direction="column" gap="l" align="stretch">
					<MHeading mode="h1">New application</MHeading>
					<MDivider />

					<MGrid columnTemplate="1fr 1fr" columnGap="xl" rowGap="xl">
						<MFormField
							control={
								<MInput name="job_title" placeholder="Product manager" />
							}
							label="Job Title"
							required
							status="regular"
							direction="column"
							spacing="full"
						/>

						<MFormField
							control={<MInput name="company" placeholder="Apple" />}
							label="Company"
							required
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
							/>
						}
						label="I am good at..."
						required
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
								counterPosition="outside"
							/>
						}
						label="Additional details"
						required
						status="regular"
						direction="column"
						spacing="full"
					/>

					<MButton type="submit" mode="primary" size="l" stretch>
						Generate Now
					</MButton>
				</MFlex>
			</form>
			<ApplicationCard
				expandable={false}
				application={{
					id: 0,
					text: `Dear Stripe team,
I am writing to express my interest in the product designer position at Stripe. With a strong background in user-centered design and a passion for creating intuitive digital experiences, I believe I would be a valuable addition to your team.
I have experience working on a variety of design projects, from mobile apps to web platforms, and have a deep understanding of design principles and best practices. I am particularly excited about the opportunity to work on building out the design system for Stripe's platform, as I believe that a well-designed system can greatly enhance the user experience.
In addition to my technical skills, I am a strong communicator and collaborator. I enjoy working closely with cross-functional teams to ensure that designs are not only visually appealing but also meet the needs of users and business goals.
Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to the success of Stripe.`,
				}}
			/>
		</MGrid>
	);
};
