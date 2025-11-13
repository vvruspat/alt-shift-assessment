import { ComponentProps, ReactNode } from "react";
import { MDivider, MFlex } from "@/uikit";

type PageProps = ComponentProps<"main"> & {
	title?: ReactNode;
	actions?: ReactNode;
};

export const Page = ({ title, actions, children, ...mainProps }: PageProps) => {
	return (
		<main {...mainProps}>
			<MFlex direction="column" justify="start" align="stretch">
				{(title || actions) && (
					<>
						<MFlex justify="space-between" align="center">
							{title}
							{actions}
						</MFlex>
						<MDivider />
					</>
				)}
				{children}
			</MFlex>
		</main>
	);
};
