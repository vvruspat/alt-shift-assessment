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
			footer={
				<MFlex justify={onDelete ? "space-between" : "end"} gap="m">
					{onDelete && (
						<MButton
							mode="transparent"
							before={<DeleteIcon />}
							onClick={() => onDelete(application.id)}
						>
							Delete
						</MButton>
					)}
					<MButton mode="transparent" after={<CopyIcon />}>
						Copy to clipboard
					</MButton>
				</MFlex>
			}
		>
			{expandable && (
				<MExpandableText
					showBlur
					visibleLines={4}
					showExpandButton={false}
					showCollapseButton={false}
					customOverlayClass={styles.expandableOverlay}
				>
					<MText style={{ whiteSpace: "pre-wrap" }}>{application.text}</MText>
				</MExpandableText>
			)}
			{!expandable && (
				<MText style={{ whiteSpace: "pre-wrap" }}>{application.text}</MText>
			)}
		</MCard>
	);
};
