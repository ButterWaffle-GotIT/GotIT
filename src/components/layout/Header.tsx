"use client";

import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_NAV_ITEMS } from "@/constants/navigation";
import { useAuthCore } from "@/contexts/auth";
import { Logo, NavItem, LoginButton, ProfileDropdown } from "./header-parts";

type HeaderProps = {
	showNav?: boolean;
	navItems?: readonly { label: string; href: string }[];
};

export default function Header({
	showNav = false,
	navItems = DEFAULT_NAV_ITEMS,
}: HeaderProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { user, loading, logout } = useAuthCore();

	if (pathname === "/login" || pathname === "/onboarding") {
		return null;
	}

	const isLoggedIn = !!user;
	const displayedNavItems = isLoggedIn ? navItems : navItems.slice(0, 1);

	const handleLoginClick = () => {
		router.push("/login");
	};

	const handleLogout = async () => {
		await logout();
		router.push("/");
	};

	if (loading) {
		return (
			<header className="bg-black-10 isolate flex w-full items-center justify-between px-60 py-4 backdrop-blur-sm">
				<div className="flex items-center gap-10">
					<Logo />
				</div>
			</header>
		);
	}

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
					<ProfileDropdown
						photoURL={user?.photoURL}
						email={user?.email}
						onLogout={handleLogout}
					/>
				) : (
					<LoginButton onClick={handleLoginClick} />
				)}
			</div>
		</header>
	);
}
