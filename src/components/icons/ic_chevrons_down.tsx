import { IconProps, getIconSize } from "./types";

export const ChevronsDownIcon = ({
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
				d="M4.66669 8.66667L8.00002 12L11.3334 8.66667M4.66669 4L8.00002 7.33333L11.3334 4"
				stroke={color}
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
