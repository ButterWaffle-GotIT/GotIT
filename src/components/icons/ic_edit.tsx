import { IconProps, getIconSize } from "./types";

export const EditIcon = ({
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
				d="M7.36744 3.26512H3.19276C2.87642 3.26512 2.57304 3.39078 2.34935 3.61447C2.12567 3.83816 2 4.14154 2 4.45788V12.8072C2 13.1236 2.12567 13.427 2.34935 13.6506C2.57304 13.8743 2.87642 14 3.19276 14H11.5421C11.8585 14 12.1618 13.8743 12.3855 13.6506C12.6092 13.427 12.7349 13.1236 12.7349 12.8072V8.63256M11.8403 2.37054C12.0776 2.13329 12.3994 2 12.7349 2C13.0704 2 13.3922 2.13329 13.6295 2.37054C13.8667 2.6078 14 2.92959 14 3.26512C14 3.60065 13.8667 3.92244 13.6295 4.15969L7.96382 9.82532L5.57829 10.4217L6.17468 8.03618L11.8403 2.37054Z"
				stroke={color}
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
