import type { Preview } from "@storybook/nextjs-vite";

import "./preview.css";
import "../src/uikit/styles/index.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";

const preview: Preview = {
	decorators: [
		withThemeByDataAttribute({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
			attributeName: "data-theme",
		}),
		(Story, { _parameters }) => {
			document.documentElement.setAttribute("data-brand", "alt-shift");
			document.documentElement.setAttribute("data-platform", "web-desktop");
			return <Story />;
		},
	],

	tags: ["autodocs"],
};

export default preview;
