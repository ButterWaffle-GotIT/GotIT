import { IconProps, getIconSize } from "./types";

export const CategoryBackendIcon = ({
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
				d="M3.52005 7.33333H12.4801V3.33333H3.52005V7.33333ZM13.7601 2.66667V13.3333C13.7601 13.52 13.6982 13.6778 13.5745 13.8067C13.4507 13.9356 13.2993 14 13.1201 14H2.88005C2.70085 14 2.54938 13.9356 2.42565 13.8067C2.30192 13.6778 2.24005 13.52 2.24005 13.3333V2.66667C2.24005 2.48 2.30192 2.32222 2.42565 2.19333C2.54938 2.06444 2.70085 2 2.88005 2H13.1201C13.2993 2 13.4507 2.06444 13.5745 2.19333C13.6982 2.32222 13.7601 2.48 13.7601 2.66667ZM12.4801 8.66667H3.52005V12.6667H12.4801V8.66667ZM4.80005 10H6.72005V11.3333H4.80005V10ZM4.80005 4.66667H6.72005V6H4.80005V4.66667Z"
				fill={color}
			/>
		</svg>
	);
};
