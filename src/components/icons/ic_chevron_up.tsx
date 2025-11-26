import { IconProps, getIconSize } from "./types";

export const ChevronUpIcon = ({
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
				d="M12 10L8 6L4 10"
				stroke={color}
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
