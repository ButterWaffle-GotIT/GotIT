import { IconProps, getIconSize } from "./types";

export const CalendarIcon = ({
	color = "currentColor",
	className,
	...props
}: IconProps) => {
	const { width, height } = getIconSize(props);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M7.6 2V3.6H12.4V2H14V3.6H17.2C17.424 3.6 17.6133 3.67734 17.768 3.832C17.9227 3.98667 18 4.176 18 4.4V17.2C18 17.424 17.9227 17.6133 17.768 17.768C17.6133 17.9227 17.424 18 17.2 18H2.8C2.576 18 2.38667 17.9227 2.232 17.768C2.07733 17.6133 2 17.424 2 17.2V4.4C2 4.176 2.07733 3.98667 2.232 3.832C2.38667 3.67734 2.576 3.6 2.8 3.6H6V2H7.6ZM16.4 9.2H3.6V16.4H16.4V9.2ZM12.432 10.112L13.552 11.248L9.6 15.2L6.768 12.368L7.904 11.248L9.6 12.944L12.432 10.112ZM6 5.2H3.6V7.6H16.4V5.2H14V6H12.4V5.2H7.6V6H6V5.2Z"
				fill={color}
			/>
		</svg>
	);
};
