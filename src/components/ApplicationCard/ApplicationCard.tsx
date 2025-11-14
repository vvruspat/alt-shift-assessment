"use client";

import { ComponentProps } from "react";
import { Application } from "@/types/application";
import { MButton, MCard, MExpandableText, MFlex, MText } from "@/uikit";
import { CopyIcon } from "../icons/CopyIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import styles from "./ApplicationCard.module.css";

type ApplicationCardProps = ComponentProps<typeof MCard> & {
	application: Application;
	expandable?: boolean;
	onDelete?: (id: Application["id"]) => void;
};

export const ApplicationCard = ({
	application,
	expandable = true,
	onDelete,
}: ApplicationCardProps) => {
	return (
		<MCard
			className={styles.applicationCard}
			shadow={false}
			gap="xl"
			footer={
				<MFlex justify={onDelete ? "space-between" : "end"} gap="m">
					{onDelete && (
						<MButton
							mode="transparent"
							before={<DeleteIcon />}
							onClick={() => onDelete(application.id)}
							className={styles.actionButton}
						>
							<MText mode="secondary">Delete</MText>
						</MButton>
					)}
					<MButton
						mode="transparent"
						after={<CopyIcon />}
						className={styles.actionButton}
					>
						<MText mode="secondary">Copy to clipboard</MText>
					</MButton>
				</MFlex>
			}
		>
			{expandable && (
				<MExpandableText
					showBlur
					visibleLines={5}
					lineHeight={28}
					showExpandButton={false}
					showCollapseButton={false}
					customOverlayClass={styles.expandableOverlay}
				>
					<MText className={styles.text} mode="secondary" size="xl">
						{application.text}
					</MText>
				</MExpandableText>
			)}
			{!expandable && (
				<MText className={styles.text} mode="secondary" size="xl">
					{application.text}
				</MText>
			)}
		</MCard>
	);
};
