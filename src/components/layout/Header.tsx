"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { UserIcon, LogoText } from "@/components/icons";
import { GlassButton } from "@/components/ui/GlassButton";
import { DEFAULT_NAV_ITEMS } from "@/constants/navigation";
import { useAuthCore } from "@/contexts/auth";

type NavItemProps = {
	label: string;
	href: string;
};

type HeaderProps = {
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
		<span className="text-base leading-7 font-bold text-neutral-300 transition-colors hover:text-white">
			로그인
		</span>
	</GlassButton>
);

const ProfileDropdown = ({
	photoURL,
	email,
	onLogout,
}: {
	photoURL?: string | null;
	email?: string | null;
	onLogout: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleDashboardClick = () => {
		setIsOpen(false);
		router.push("/dashboard");
	};

	const handleLogoutClick = () => {
		setIsOpen(false);
		onLogout();
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<GlassButton
				variant="rounded"
				className="p-1.5"
				aria-label="프로필"
				onClick={() => setIsOpen(!isOpen)}
			>
				{photoURL ? (
					<Image
						src={photoURL}
						alt="프로필"
						width={28}
						height={28}
						className="rounded-full"
					/>
				) : (
					<UserIcon width={28} height={28} color="white" />
				)}
			</GlassButton>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl bg-gray-900/95 shadow-lg ring-1 ring-white/10 backdrop-blur-sm">
					<div className="border-b border-white/10 px-4 py-3">
						<p className="truncate text-sm text-gray-300">{email}</p>
					</div>
					<div className="py-1">
						<button
							onClick={handleDashboardClick}
							className="flex w-full items-center px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
						>
							대시보드
						</button>
						<button
							onClick={handleLogoutClick}
							className="flex w-full items-center px-4 py-2.5 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
						>
							로그아웃
						</button>
					</div>
				</div>
			)}
		</div>
	);
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
