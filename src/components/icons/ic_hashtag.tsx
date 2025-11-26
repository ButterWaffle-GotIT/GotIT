import { IconProps, getIconSize } from "./types";

export const HashtagIcon = ({
	color = "currentColor",
	className,
	...props
}: IconProps) => {
	const { width, height } = getIconSize(props);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M4.42006 8.33333L4.68896 5.66667H2V4.33333H4.82981L5.16273 1H6.45599L6.11027 4.33333H8.67118L9.0041 1H10.2974L9.95164 4.33333H12.2437V5.66667H9.82359L9.5547 8.33333H12.2437V9.66667H9.41385L9.08093 13H7.78767L8.13339 9.66667H5.57248L5.23956 13H3.9463L4.29202 9.66667H2V8.33333H4.42006ZM5.71333 8.33333H8.26144L8.53033 5.66667H5.98222L5.71333 8.33333Z"
				fill={color}
			/>
		</svg>
	);
};
