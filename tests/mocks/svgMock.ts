import React from "react";

const SvgMock = React.forwardRef<SVGSVGElement>((props, ref) =>
	React.createElement("svg", { ...props, ref }),
);

SvgMock.displayName = "SvgMock";

export default SvgMock;
export const ReactComponent = SvgMock;
