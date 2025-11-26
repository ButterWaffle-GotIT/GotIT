import { IconProps, getIconSize } from "./types";

export const Info2Icon = ({
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
				d="M12.04 4.66666V12.25C12.04 12.4133 11.9859 12.5514 11.8776 12.6642C11.7694 12.7769 11.6368 12.8333 11.48 12.8333H2.52002C2.36322 12.8333 2.23069 12.7769 2.12242 12.6642C2.01416 12.5514 1.96002 12.4133 1.96002 12.25V1.75C1.96002 1.58666 2.01416 1.44861 2.12242 1.33583C2.23069 1.22305 2.36322 1.16666 2.52002 1.16666H8.68002L12.04 4.66666ZM10.92 5.24999H8.12002V2.33333H3.08002V11.6667H10.92V5.24999ZM4.76002 4.08333H6.44002V5.24999H4.76002V4.08333ZM4.76002 6.41666H9.24002V7.58333H4.76002V6.41666ZM4.76002 8.74999H9.24002V9.91666H4.76002V8.74999Z"
				fill={color}
			/>
		</svg>
	);
};
