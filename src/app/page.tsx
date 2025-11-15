import { ApplicationBanner } from "@/components/ApplicationBanner";
import { ApplicationCard } from "@/components/ApplicationCard";
import { ApplicationsList } from "@/components/ApplicationsList";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Page } from "@/components/Page";
import { Application } from "@/types/application";
import { MHeading, MLinkButton } from "@/uikit";

const applications: Application[] = [
	{
		id: 1,
		text: `Dear Stripe team,
    
I am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and work on building out the design system for the platform.
I am particularly drawn to Stripe's mission of making it easy for businesses to sell online and am confident that my experience in creating user-friendly designs will be an asset to the team. I have experience in conducting user research, creating wireframes, and prototyping interactive designs, as well as working closely with engineers to ensure that my designs are implemented correctly.
I am a strong collaborator and have experience working in cross-functional teams to bring new products and features to market. I'm confident that I can help improve Stripe's user experience and make it even more accessible to businesses.
I would love the opportunity to speak with you further about my qualifications and how I can contribute to the Stripe team. Thank you for considering my application.`,
	},
	{
		id: 2,
		text: `Dear Stripe team,

I am writing to express my interest in the product designer position at Stripe. With a strong background in user-centered design and a passion for creating intuitive digital experiences, I believe I would be a valuable addition to your team.
I have experience working on a variety of design projects, from mobile apps to web platforms, and have a deep understanding of design principles and best practices. I am particularly excited about the opportunity to work on building out the design system for Stripe's platform, as I believe that a well-designed system can greatly enhance the user experience.
In addition to my technical skills, I am a strong communicator and collaborator. I enjoy working closely with cross-functional teams to ensure that designs are not only visually appealing but also meet the needs of users and business goals.
Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to the success of Stripe.`,
	},
	{
		id: 3,
		text: `Dear Stripe team,
    
I am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and work on building out the design system for the platform.
I am particularly drawn to Stripe's mission of making it easy for businesses to sell online and am confident that my experience in creating user-friendly designs will be an asset to the team. I have experience in conducting user research, creating wireframes, and prototyping interactive designs, as well as working closely with engineers to ensure that my designs are implemented correctly.
I am a strong collaborator and have experience working in cross-functional teams to bring new products and features to market. I'm confident that I can help improve Stripe's user experience and make it even more accessible to businesses.
I would love the opportunity to speak with you further about my qualifications and how I can contribute to the Stripe team. Thank you for considering my application.`,
	},
	{
		id: 4,
		text: `Dear Stripe team,

I am writing to express my interest in the product designer position at Stripe. With a strong background in user-centered design and a passion for creating intuitive digital experiences, I believe I would be a valuable addition to your team.
I have experience working on a variety of design projects, from mobile apps to web platforms, and have a deep understanding of design principles and best practices. I am particularly excited about the opportunity to work on building out the design system for Stripe's platform, as I believe that a well-designed system can greatly enhance the user experience.
In addition to my technical skills, I am a strong communicator and collaborator. I enjoy working closely with cross-functional teams to ensure that designs are not only visually appealing but also meet the needs of users and business goals.
Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to the success of Stripe.`,
	},
];

export default function ListOfApplicationsPage() {
	return (
		<Page
			header={<MHeading mode="h1">Applications</MHeading>}
			actions={
				<MLinkButton
					mode="primary"
					before={<PlusIcon />}
					href="/create"
					size="m"
				>
					Create New
				</MLinkButton>
			}
		>
			<ApplicationsList applications={applications} />
			<ApplicationBanner />
		</Page>
	);
}
