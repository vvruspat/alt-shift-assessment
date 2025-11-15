"use client";

import { motion } from "framer-motion";

export const FormSpinner = () => {
	return (
		<motion.svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			animate={{
				rotate: 360,
			}}
			transition={{
				duration: 3,
				repeat: Number.POSITIVE_INFINITY,
				ease: "linear",
			}}
		>
			<path
				d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</motion.svg>
	);
};
