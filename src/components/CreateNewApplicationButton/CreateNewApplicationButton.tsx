"use client";
import { useCreateApplicationStore } from "@/store/useCreateApplicationStore";
import { MLinkButton } from "@/uikit";
import { LinkButtonProps } from "@/uikit/atoms/MButton";

export const CreateNewApplicationButton = ({
	onClick,
	...props
}: LinkButtonProps) => {
	const { reset } = useCreateApplicationStore();

	return (
		<MLinkButton onClick={() => reset()} {...props}>
			Create New
		</MLinkButton>
	);
};
