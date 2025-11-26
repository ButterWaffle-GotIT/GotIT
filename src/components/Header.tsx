"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dela_Gothic_One } from "next/font/google";
import { UserIcon } from "./icons";
import { GlassButton } from "./GlassButton";
import type { HeaderProps, NavItem as NavItemType } from "@/types/header";

const delaGothicOne = Dela_Gothic_One({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

const Logo = () => (
	<Link href="/" className="flex flex-col items-start justify-start">
		<div className="flex h-7 flex-col items-start justify-start gap-2.5">
			<div className="inline-flex items-center justify-start gap-3.5">
				<span
					className={`${delaGothicOne.className} text-2xl leading-6 font-normal text-white`}
				>
					got IT
				</span>
			</div>
		</div>
	</Link>
);

const NavItem = ({
	label,
	href,
	isActive,
}: {
	label: string;
	href: string;
	isActive: boolean;
}) => (
	<Link
		href={href}
		data-isactive={isActive}
		className="group hover:bg-white-10 flex w-24 items-center justify-center rounded py-2 backdrop-blur-sm transition-colors"
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

const LoginButton = () => (
	<GlassButton className="px-6 py-2">
		<span className="text-lg leading-7 font-bold text-neutral-300 transition-colors hover:text-white">
			로그인
		</span>
	</GlassButton>
);

const ProfileButton = () => (
	<GlassButton variant="rounded" className="p-1.5" aria-label="프로필">
		<div className="relative h-7 w-7">
			<UserIcon className="h-7 w-7" />
		</div>
	</GlassButton>
);

export default function Header({
	isLoggedIn = false,
	showNav = false,
	navItems = [
		{ label: "검색", href: "/search" },
		{ label: "대시보드", href: "/dashboard" },
		{ label: "챗봇", href: "/chatbot" },
	],
}: HeaderProps) {
	const pathname = usePathname();

	return (
		<header className="bg-black-10 isolate inline-flex w-full items-center justify-center px-60 py-4 backdrop-blur-sm">
			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center justify-start gap-10">
					<Logo />
					{showNav && (
						<nav className="flex items-center justify-start gap-2">
							{navItems.map((item) => (
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
				<div className="flex items-start justify-start">
					{isLoggedIn ? <ProfileButton /> : <LoginButton />}
				</div>
			</div>
		</header>
	);
}
