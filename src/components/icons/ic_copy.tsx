import { IconProps, getIconSize } from "./types";

export const CopyIcon = ({
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
			{/* 두 장의 사각형(겹친 복사 아이콘) */}
			<rect
				x="5"
				y="3"
				width="8"
				height="8"
				rx="1"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="2"
				y="6"
				width="8"
				height="8"
				rx="1"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
