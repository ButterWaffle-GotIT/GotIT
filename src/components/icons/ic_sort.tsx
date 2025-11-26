import { IconProps, getIconSize } from "./types";

export const SortIcon = ({
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
				d="M12.3894 2.66667V10.1961H14.2706L11.7624 13.3333L9.25414 10.1961H11.1353V2.66667H12.3894ZM7.37296 11.451V12.7059H1.72943V11.451H7.37296ZM8.62708 7.05882V8.31372H1.72943V7.05882H8.62708ZM8.62708 2.66667V3.92157H1.72943V2.66667H8.62708Z"
				fill={color}
			/>
		</svg>
	);
};
