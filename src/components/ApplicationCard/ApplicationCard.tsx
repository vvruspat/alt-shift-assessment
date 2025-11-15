"use client";

import { ComponentProps, useState } from "react";
import { Application } from "@/types/application";
import { MButton, MCard, MExpandableText, MFlex, MText } from "@/uikit";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { CheckIcon } from "../PageIcons/CheckIcon";
import { CopyIcon } from "../PageIcons/CopyIcon";
import { DeleteIcon } from "../PageIcons/DeleteIcon";
import { PendingBall } from "../PendingBall";
import styles from "./ApplicationCard.module.css";

type ApplicationCardProps = ComponentProps<typeof MCard> & {
	application: Application;
	placeholder?: string;
	expandable?: boolean;
	pending?: boolean;
	onDelete?: (id: Application["id"]) => void;
};

export const ApplicationCard = ({
	application,
	expandable = true,
	pending = false,
	placeholder,
	onDelete,
}: ApplicationCardProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const onCopyClick = async () => {
		try {
			await copyToClipboard(application.text);

			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (error) {
			console.error("Failed to copy text to clipboard:", error);
		}
	};

	const onDeleteClick = () => {
		if (onDelete) {
			onDelete(application.id);
		}
	};

	return (
		<MCard
			className={styles.applicationCard}
			shadow={false}
			gap="xl"
			footer={
				!pending && (
					<MFlex justify={onDelete ? "space-between" : "end"} gap="m">
						{onDelete && (
							<MButton
								mode="transparent"
								before={<DeleteIcon />}
								onClick={() => onDelete(application.id)}
								className={styles.actionButton}
							>
								<MText mode="secondary" onClick={onDeleteClick}>
									Delete
								</MText>
							</MButton>
						)}
						{application.text && (
							<MButton
								mode="transparent"
								after={isCopied ? <CheckIcon /> : <CopyIcon />}
								className={styles.actionButton}
								onClick={onCopyClick}
							>
								{isCopied ? (
									<MText mode="secondary">Copied!</MText>
								) : (
									<MText mode="secondary">Copy to clipboard</MText>
								)}
							</MButton>
						)}
					</MFlex>
				)
			}
		>
			{pending ? (
				<MFlex
					align="center"
					justify="center"
					className={styles.pendingWrapper}
				>
					<PendingBall />
				</MFlex>
			) : (
				<>
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
								{application.text || placeholder}
							</MText>
						</MExpandableText>
					)}
					{!expandable && (
						<MText className={styles.text} mode="secondary" size="xl">
							{application.text || placeholder}
						</MText>
					)}
				</>
			)}
		</MCard>
	);
};
