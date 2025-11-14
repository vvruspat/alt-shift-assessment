import { MFlex, MLinkButton, MStepProgress } from "@/uikit";
import { HomeIcon } from "../icons/HomeIcon";
import { Logo } from "../Logo";
import styles from "./Header.module.css";

export const Header = () => {
	return (
		<header className={styles.header}>
			<MFlex justify="space-between">
				<Logo />
				<MFlex justify="end" gap="2xl">
					<MStepProgress
						steps={5}
						currentStep={2}
						showLabel={true}
						direction="row"
						mode="black"
						bullets={true}
						justify="center"
						align="center"
						bulletsSize="s"
						label="3/5 applications generated"
					/>
					<MLinkButton mode="outlined" href="/" className={styles.homeButton}>
						<HomeIcon />
					</MLinkButton>
				</MFlex>
			</MFlex>
		</header>
	);
};
