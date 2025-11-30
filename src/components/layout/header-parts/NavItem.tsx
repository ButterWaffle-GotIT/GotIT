import Link from "next/link";

interface NavItemProps {
	label: string;
	href: string;
	isActive: boolean;
}

export function NavItem({ label, href, isActive }: NavItemProps) {
	return (
		<Link
			href={href}
			data-isactive={isActive}
			className="group hover:bg-white-10 flex w-24 items-center justify-center rounded py-2 transition-colors"
		>
			<span
				className={`text-lg leading-7 font-bold ${
					isActive ? "text-primary-300" : "text-neutral-300"
				} group-hover:text-primary-300 transition-colors`}
			>
				{label}
			</span>
		</Link>
	);
}
