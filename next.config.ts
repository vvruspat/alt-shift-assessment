import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: path.join(__dirname, "."),
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	webpack(config, { webpack }) {
		// Webpack config for when turbopack is disabled
		// Find the existing rule that handles SVG imports
		// biome-ignore lint/suspicious/noExplicitAny: Webpack config types are complex
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
				}, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}

		return config;
	},
};

export default nextConfig;
