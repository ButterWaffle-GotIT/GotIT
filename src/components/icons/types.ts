export interface IconProps {
	size?: number;
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

export const getIconSize = (props: IconProps) => {
	const { size = 32, width, height } = props;
	return {
		width: width ?? size,
		height: height ?? size,
	};
};
