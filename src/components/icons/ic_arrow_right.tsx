import { IconProps, getIconSize } from "./types";

export const ArrowRightIcon = ({
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
				d="M10.6752 7.33334L7.232 3.76L8.1408 2.81334L13.12 8L8.1408 13.1867L7.232 12.24L10.6752 8.66667H2.88V7.33334H10.6752Z"
				fill={color}
			/>
		</svg>
	);
};
