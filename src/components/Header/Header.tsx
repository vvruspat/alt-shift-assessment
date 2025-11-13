import { MFlex, MLinkButton, MStepProgress } from "@/uikit";
import { HomeIcon } from "../icons/HomeIcon";
import { Logo } from "../Logo";

export const Header = () => {
	return (
		<header>
			<MFlex justify="space-between">
				<Logo />
				<MFlex justify="end">
					<MStepProgress
						steps={5}
						currentStep={2}
						showLabel={true}
						direction="row"
						mode="primary"
						bullets={true}
						justify="center"
						align="center"
						bulletsSize="m"
					/>
					<MLinkButton mode="outlined" href="/">
						<HomeIcon />
					</MLinkButton>
				</MFlex>
			</MFlex>
		</header>
	);
};
