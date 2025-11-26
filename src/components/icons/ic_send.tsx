import { IconProps, getIconSize } from "./types";

export const SendIcon = ({
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
				d="M1.77921 5.97333C1.61708 5.91111 1.53601 5.84 1.53601 5.76C1.53601 5.68 1.62134 5.60889 1.79201 5.54667L14.0032 1.30667C14.1739 1.24444 14.3019 1.25556 14.3872 1.34C14.4725 1.42444 14.4896 1.55555 14.4384 1.73333L10.9568 14.4533C10.9056 14.6311 10.8373 14.7222 10.752 14.7267C10.6667 14.7311 10.5899 14.6489 10.5216 14.48L8.21761 9.09333L12.0576 3.76L6.93761 7.76L1.77921 5.97333Z"
				fill={color}
			/>
		</svg>
	);
};
