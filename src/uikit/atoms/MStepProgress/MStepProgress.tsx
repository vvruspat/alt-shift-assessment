import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { MFlex } from "../MFlex";
import { MGrid } from "../MGrid";
import "./MStepProgress.vars.css";
import styles from "./MStepProgress.module.css";

export type MStepProgressProps = ComponentProps<typeof MFlex> & {
	mode?:
		| "error"
		| "warning"
		| "success"
		| "info"
		| "primary"
		| "secondary"
		| "tertiary"
		| "black";
	steps?: number;
	currentStep?: number;
	bullets?: boolean;
	bulletsSize?: "s" | "m" | "l";
	showLabel?: boolean;
	label?: ReactNode;
	doneIcon?: ReactNode;
};

export const MStepProgress = ({
	mode = "info",
	steps = 10,
	currentStep = 0,
	label,
	showLabel = false,
	bullets = false,
	bulletsSize = "m",
	doneIcon,
	children,
	...restProps
}: MStepProgressProps) => {
	if (!mode) {
		return null;
	}
	return (
		<MFlex
			direction="column"
			justify="center"
			align="stretch"
			gap="l"
			{...restProps}
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={0}
			aria-valuemax={steps}
		>
			{(showLabel || label) && (
				<div
					role="presentation"
					className={clsx(
						styles["step-progress-label"],
						styles[`step-progress-label-mode-${mode}`],
					)}
				>
					{label || `Step ${currentStep} of ${steps}`}
				</div>
			)}
			{doneIcon && currentStep >= steps ? (
				doneIcon
			) : (
				<MGrid
					columnTemplate={`repeat(${steps}, 1fr)`}
					tag="ul"
					className={styles["step-progress-list"]}
					columnGap={
						bulletsSize === "s" ? "xs" : bulletsSize === "m" ? "s" : "m"
					}
				>
					{Array.from({ length: steps }, (_, index) => (
						<li
							key={index}
							aria-current={currentStep === index ? "step" : undefined}
							className={clsx(
								styles["step-progress-item"],
								bullets && styles["step-progress-item--bullets"],
								bullets &&
									styles[`step-progress-item--bullets-size-${bulletsSize}`],
								index < currentStep
									? styles[`step-progress-mode-${mode}`]
									: styles["step-progress-mode-pending"],
							)}
						/>
					))}
				</MGrid>
			)}
		</MFlex>
	);
};

export default MStepProgress;
