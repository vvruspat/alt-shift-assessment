import { Suspense } from "react";
import * as Icons from "./index";
import type { MIconProps } from "./types";

type MIconLoaderProps = MIconProps & {
	name: string;
};

type IconsMap = Record<string, React.ComponentType<MIconProps>>;

export const MIconLoader = ({ name, ...restProps }: MIconLoaderProps) => {
	const iconsMap = Icons as IconsMap;
	const LazyComponent = iconsMap[name];

	if (!LazyComponent) {
		console.warn(`Icon component "${name}" not found`);
		return null;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LazyComponent {...restProps} />
		</Suspense>
	);
};

export default MIconLoader;
