import {
	MButton,
	MCard,
	MFlex,
	MHeading,
	MLinkButton,
	MStepProgress,
	MText,
} from "@/uikit";
import { PlusIcon } from "../icons/PlusIcon";

export const ApplicationBanner = () => {
	return (
		<MCard align="center" justify="center">
			<MFlex direction="column" gap="l" align="center" justify="center">
				<MHeading mode="h2">Hit your goal</MHeading>
				<MText>
					Generate and send out couple more job applications today to get hired
					faster
				</MText>
				<MLinkButton
					mode="primary"
					size="l"
					before={<PlusIcon width={24} height={24} />}
					href="/create"
				>
					Create new
				</MLinkButton>
				<MStepProgress
					mode="primary"
					steps={5}
					currentStep={2}
					showLabel={true}
					direction="column-reverse"
					label={`2 out of 5`}
				/>
			</MFlex>
		</MCard>
	);
};
