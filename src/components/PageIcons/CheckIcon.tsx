import { ComponentProps } from "react";

export const CheckIcon = (svgProps: ComponentProps<"svg">) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...svgProps}
	>
		<path
			fill="currentColor"
			d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"
		/>
	</svg>
);
