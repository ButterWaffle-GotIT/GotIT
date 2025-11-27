"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserIcon, LogoText } from "@/components/icons";
import { GlassButton } from "@/components/ui/GlassButton";
import { DEFAULT_NAV_ITEMS } from "@/constants/navigation";

type NavItemProps = {
	label: string;
	href: string;
};

type HeaderProps = {
	isLoggedIn?: boolean;
	showNav?: boolean;
	navItems?: readonly NavItemProps[];
};

const Logo = () => (
	<Link href="/" className="flex items-center">
		<LogoText width={89} height={30} />
	</Link>
);

const NavItem = ({
	label,
	href,
	isActive,
}: NavItemProps & { isActive: boolean }) => (
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

const LoginButton = ({ onClick }: { onClick: () => void }) => (
	<GlassButton className="px-6 py-2" onClick={onClick}>
		<span className="text-lg leading-7 font-bold text-neutral-300 transition-colors hover:text-white">
			로그인
		</span>
	</GlassButton>
);

const ProfileButton = () => (
	<GlassButton variant="rounded" className="p-1.5" aria-label="프로필">
		<UserIcon width={28} height={28} color="white" />
	</GlassButton>
);

export default function Header({
	isLoggedIn = false,
	showNav = false,
	navItems = DEFAULT_NAV_ITEMS,
}: HeaderProps) {
	const pathname = usePathname();
	const router = useRouter();

	if (pathname === "/login") {
		return null;
	}

	const displayedNavItems = isLoggedIn ? navItems : navItems.slice(0, 1);

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<header className="bg-black-10 isolate flex w-full items-center justify-between px-60 py-4 backdrop-blur-sm">
			<div className="flex items-center gap-10">
				<Logo />
				{showNav && (
					<nav className="flex items-center gap-2">
						{displayedNavItems.map((item) => (
							<NavItem
								key={item.href}
								label={item.label}
								href={item.href}
								isActive={pathname === item.href}
							/>
						))}
					</nav>
				)}
			</div>
			<div className="flex items-center">
				{isLoggedIn ? (
					<ProfileButton />
				) : (
					<LoginButton onClick={handleLoginClick} />
				)}
			</div>
		</header>
	);
}
