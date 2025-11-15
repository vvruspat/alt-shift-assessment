import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Exclude Storybook files from the build
	pageExtensions: ["tsx", "ts", "jsx", "js"].map((ext) => {
		return ext;
	}),
};

export default nextConfig;
