import { IconProps, getIconSize } from "./types";

export const InfoIcon = ({
	color = "currentColor",
	className,
	...props
}: IconProps) => {
	const { width, height } = getIconSize(props);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M14.76 16.5H3.24002C3.03842 16.5 2.86802 16.4275 2.72882 16.2825C2.58962 16.1375 2.52002 15.96 2.52002 15.75V2.25C2.52002 2.04 2.58962 1.8625 2.72882 1.7175C2.86802 1.5725 3.03842 1.5 3.24002 1.5H14.76C14.9616 1.5 15.132 1.5725 15.2712 1.7175C15.4104 1.8625 15.48 2.04 15.48 2.25V15.75C15.48 15.96 15.4104 16.1375 15.2712 16.2825C15.132 16.4275 14.9616 16.5 14.76 16.5ZM14.04 15V3H3.96002V15H14.04ZM5.40002 4.5H8.28002V7.5H5.40002V4.5ZM5.40002 9H12.6V10.5H5.40002V9ZM5.40002 12H12.6V13.5H5.40002V12ZM9.72002 5.25H12.6V6.75H9.72002V5.25Z"
				fill={color}
			/>
		</svg>
	);
};
