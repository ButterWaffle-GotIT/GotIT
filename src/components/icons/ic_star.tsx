import { IconProps, getIconSize } from "./types";

export const StarIcon = ({
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
			<g clipPath="url(#clip0_250_6231)">
				<path
					d="M6.99999 11.025L2.88312 13.335L3.80446 8.70333L0.340698 5.50667L5.02902 4.94667L6.99999 0.664999L8.97095 4.94667L13.6593 5.50667L10.1955 8.70333L11.1168 13.335L6.99999 11.025ZM6.99999 9.695L9.47244 11.0833L8.9243 8.295L11.0119 6.37L8.18956 6.03167L6.99999 3.45333L5.81041 6.03167L2.98809 6.37L5.07567 8.295L4.52754 11.0833L6.99999 9.695Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_250_6231">
					<rect width="14" height="14" fill={color} />
				</clipPath>
			</defs>
		</svg>
	);
};
