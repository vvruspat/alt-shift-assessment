import { APPLICATIONS_GOAL } from "@/constants/applicationsGoal";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import {
	MCard,
	MFlex,
	MHeading,
	MLinkButton,
	MStepProgress,
	MText,
} from "@/uikit";
import { CreateNewApplicationButton } from "../CreateNewApplicationButton";
import { PlusIcon } from "../PageIcons/PlusIcon";
import styles from "./ApplicationBanner.module.css";

export const ApplicationBanner = () => {
	const applicationsNumber = useApplicationsStore(
		(state) => Object.keys(state.applications).length,
	);

	return (
		<MCard
			align="center"
			justify="center"
			className={styles.applicationBanner}
			shadow={false}
		>
			<MFlex direction="column" gap="4xl" align="center" justify="center">
				<MFlex direction="column" gap="l" align="center" justify="center">
					<MHeading mode="h2">Hit your goal</MHeading>
					<MText mode="secondary" className={styles.description} size="xl">
						Generate and send out couple more job applications today to get
						hired faster
					</MText>
					<CreateNewApplicationButton
						mode="primary"
						size="xl"
						before={<PlusIcon width={24} height={24} />}
						href="/create"
					/>
				</MFlex>
				<MStepProgress
					mode="black"
					steps={APPLICATIONS_GOAL}
					currentStep={applicationsNumber}
					showLabel={true}
					direction="column-reverse"
					className={styles.stepProgress}
					label={
						<center>
							{applicationsNumber} out of {APPLICATIONS_GOAL}
						</center>
					}
				/>
			</MFlex>
		</MCard>
	);
};
