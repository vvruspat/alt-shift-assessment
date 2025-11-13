"use client";

import clsx from "clsx";
import {
	type DetailedHTMLProps,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { MButton } from "../MButton/MButton";
import { MFlex } from "../MFlex/MFlex";
import styles from "./MExpandableText.module.css";
import "./MExpandableText.vars.css";

type MExpandableTextProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	visibleLines?: number;
	lineHeight?: number;
	defaultExpanded?: boolean;
	expandButtonContent?: ReactNode;
	collapseButtonContent?: ReactNode;
	customOverlayClass?: string;
	showBlur?: boolean;
	showExpandButton?: boolean;
	showCollapseButton?: boolean;
	buttonAlign?: "start" | "center" | "end";
};

export const MExpandableText = ({
	children,
	visibleLines = 2,
	lineHeight = 20,
	defaultExpanded = false,
	expandButtonContent,
	collapseButtonContent,
	customOverlayClass,
	showBlur = false,
	buttonAlign = "center",
	showExpandButton = true,
	showCollapseButton = true,
	...restProps
}: MExpandableTextProps) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);
	const [maxHeight, setMaxHeight] = useState<string>(
		`${lineHeight * visibleLines}px`,
	);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const calculatedMaxHeight = `${lineHeight * visibleLines}px`;
			setMaxHeight(calculatedMaxHeight);
		}
	}, [visibleLines, lineHeight]);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<MFlex direction="column" gap="s" align={buttonAlign}>
			<div className={clsx(styles.expandableText)}>
				<div
					ref={contentRef}
					className={styles.content}
					style={{
						maxHeight: isExpanded
							? `${contentRef.current?.scrollHeight}px`
							: maxHeight,
						lineHeight: `${lineHeight}px`,
						transition: "max-height 0.3s ease-in-out",
					}}
					{...restProps}
				>
					{children}
				</div>
				{!isExpanded && showBlur && (
					<div
						style={{
							height: `${lineHeight * 2}px`,
							transition: "opacity 0.3s ease-in-out",
						}}
						className={clsx(styles.blurOverlay, customOverlayClass, {
							[styles.defaultOverlayColor]: !customOverlayClass,
						})}
					/>
				)}
			</div>
			{!isExpanded
				? showExpandButton && (
						<MButton
							size="m"
							mode="transparent"
							className={styles.button}
							onClick={toggleExpand}
						>
							{expandButtonContent ?? (
								<span className={styles.defaultButton}>Expand</span>
							)}
						</MButton>
					)
				: showCollapseButton && (
						<MButton
							size="m"
							onClick={toggleExpand}
							className={styles.button}
							mode="transparent"
						>
							{collapseButtonContent ?? (
								<span className={styles.defaultButton}>Collapse</span>
							)}
						</MButton>
					)}
		</MFlex>
	);
};

export default MExpandableText;
