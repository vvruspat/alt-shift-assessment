"use client";

import { useEffect } from "react";
import { APPLICATIONS_GOAL } from "@/constants/applicationsGoal";
import { useApplicationsStore } from "@/store/useApplicationsStore";
import { MFlex, MLinkButton, MStepProgress } from "@/uikit";
import { Logo } from "../Logo";
import { DoneIcon } from "../PageIcons/DoneIcon";
import { HomeIcon } from "../PageIcons/HomeIcon";
import styles from "./Header.module.css";

export const Header = () => {
	const applicationsNumber = useApplicationsStore(
		(state) => Object.keys(state.applications).length,
	);

	const fetchApplications = useApplicationsStore(
		(state) => state.fetchApplications,
	);

	useEffect(() => {
		fetchApplications();
	});

	return (
		<header className={styles.header}>
			<MFlex justify="space-between">
				<Logo />
				<MFlex justify="end" gap="2xl">
					<MStepProgress
						steps={APPLICATIONS_GOAL}
						currentStep={applicationsNumber}
						showLabel={true}
						direction="row"
						mode="black"
						bullets={true}
						justify="center"
						align="center"
						bulletsSize="s"
						doneIcon={<DoneIcon />}
						label={`${applicationsNumber}/${APPLICATIONS_GOAL} applications generated`}
					/>
					<MLinkButton mode="outlined" href="/" className={styles.homeButton}>
						<HomeIcon />
					</MLinkButton>
				</MFlex>
			</MFlex>
		</header>
	);
};
