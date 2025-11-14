import { ComponentProps, ReactNode } from "react";
import { MDivider, MFlex } from "@/uikit";
import styles from "./Page.module.css";

type PageProps = ComponentProps<"main"> & {
	title?: ReactNode;
	actions?: ReactNode;
};

export const Page = ({ title, actions, children, ...mainProps }: PageProps) => {
	return (
		<main {...mainProps}>
			<MFlex direction="column" justify="start" align="stretch" gap="l">
				{(title || actions) && (
					<>
						<MFlex justify="space-between" align="center">
							{title}
							{actions}
						</MFlex>
						<MDivider className={styles.headerDivider} />
					</>
				)}
				{children}
			</MFlex>
		</main>
	);
};
