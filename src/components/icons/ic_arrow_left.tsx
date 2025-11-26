import { IconProps, getIconSize } from "./types";

export const ArrowLeftIcon = ({
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
				d="M5.3248 8.66667L8.768 12.24L7.8592 13.1867L2.88 8L7.8592 2.81333L8.768 3.76L5.3248 7.33333H13.12V8.66667H5.3248Z"
				fill={color}
			/>
		</svg>
	);
};
