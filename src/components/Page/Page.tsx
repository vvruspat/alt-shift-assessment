import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { MDivider, MFlex } from "@/uikit";
import styles from "./Page.module.css";

type PageProps = ComponentProps<"main"> & {
	header?: ReactNode;
	actions?: ReactNode;
};

export const Page = ({
	header,
	actions,
	children,
	className,
	...mainProps
}: PageProps) => {
	return (
		<main {...mainProps} className={clsx(styles.page, className)}>
			<MFlex direction="column" justify="start" align="stretch" gap="l">
				{(header || actions) && (
					<>
						<MFlex justify="space-between" align="center">
							{header}
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
