import { IconProps, getIconSize } from "./types";

export const CategoryFrontendIcon = ({
	color = "currentColor",
	className,
	...props
}: IconProps) => {
	const { width, height } = getIconSize(props);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M15.6799 8L12.0575 11.7733L11.1487 10.8267L13.8751 8L11.1487 5.17333L12.0575 4.22667L15.6799 8ZM2.12475 8L4.85115 10.8267L3.94235 11.7733L0.319946 8L3.94235 4.22667L4.85115 5.17333L2.12475 8ZM6.57915 14H5.22235L9.42075 2H10.7775L6.57915 14Z"
				fill={color}
			/>
		</svg>
	);
};
