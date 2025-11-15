import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "path";
import type { Plugin } from "vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to mock SVG imports in unit tests
const svgMockPlugin = (): Plugin => ({
	name: "svg-mock",
	transform(code, id) {
		if (id.endsWith(".svg")) {
			return {
				code: `
          import React from "react";
          const SvgMock = React.forwardRef((props, ref) =>
            React.createElement("svg", { ...props, ref })
          );
          SvgMock.displayName = "SvgMock";
          export default SvgMock;
          export const ReactComponent = SvgMock;
        `,
				map: null,
			};
		}
	},
});

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [svgr()],
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [svgMockPlugin()],
				test: {
					name: "unit",
					globals: true,
					environment: "jsdom",
					include: ["src/**/*.test.{ts,tsx}"],
					exclude: ["src/**/*.stories.{ts,tsx}"],
					setupFiles: [
						"./vitest.shims.d.ts",
						"./tests/mocks/svgMock.ts",
						"./tests/mocks/matchMediaMock.ts",
					],
				},
				resolve: {
					alias: {
						"@": path.resolve(dirname, "./src"),
					},
				},
			},
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({ configDir: path.join(dirname, ".storybook") }),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: "chromium" }],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
