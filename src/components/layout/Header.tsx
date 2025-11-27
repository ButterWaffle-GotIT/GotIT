"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { UserIcon, LogoText } from "@/components/icons";
import { GlassButton } from "@/components/ui/GlassButton";
import { DEFAULT_NAV_ITEMS } from "@/constants/navigation";
import { useAuth } from "@/contexts/AuthContext";

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
		<span className="text-lg leading-7 font-bold text-neutral-300 transition-colors hover:text-white">
			로그인
		</span>
	</GlassButton>
);

const ProfileButton = ({
	photoURL,
	onClick,
}: {
	photoURL?: string | null;
	onClick: () => void;
}) => (
	<GlassButton
		variant="rounded"
		className="p-1.5"
		aria-label="프로필"
		onClick={onClick}
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
);

export default function Header({
	showNav = false,
	navItems = DEFAULT_NAV_ITEMS,
}: HeaderProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { user, loading } = useAuth();

	if (pathname === "/login") {
		return null;
	}

	const isLoggedIn = !!user;
	const displayedNavItems = isLoggedIn ? navItems : navItems.slice(0, 1);

	const handleLoginClick = () => {
		router.push("/login");
	};

	const handleProfileClick = async () => {
		//await logout();
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
					<ProfileButton
						photoURL={user?.photoURL}
						onClick={handleProfileClick}
					/>
				) : (
					<LoginButton onClick={handleLoginClick} />
				)}
			</div>
		</header>
	);
}
