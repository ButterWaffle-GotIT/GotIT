import { IconProps, getIconSize } from "./types";

export const ExternalLinkIcon = ({
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
			{/* 외부 링크: 화살표와 사각형 */}
			<path
				d="M10.5 3.5H13.5V6.5"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.5 3.5L6.5 10.5"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="2.5"
				y="2.5"
				width="9"
				height="9"
				rx="1"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
