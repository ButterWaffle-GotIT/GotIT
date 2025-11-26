import { IconProps, getIconSize } from "./types";

export const UserIcon = ({
	color = "currentColor",
	className,
	...props
}: IconProps) => {
	const { width, height } = getIconSize(props);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M16.0003 20.2321C21.7849 20.2321 26.6662 21.172 26.6663 24.7985C26.6663 28.4265 21.753 29.3336 16.0003 29.3337C10.2168 29.3337 5.33331 28.393 5.33331 24.7663C5.33362 21.1385 10.2477 20.2321 16.0003 20.2321ZM16.0003 2.66667C19.9189 2.66686 23.0589 5.80546 23.0589 9.72136C23.0589 13.6373 19.9189 16.7768 16.0003 16.777C12.0828 16.777 8.94171 13.6374 8.94171 9.72136C8.94174 5.80534 12.0829 2.66667 16.0003 2.66667Z"
				fill={color}
			/>
		</svg>
	);
};
