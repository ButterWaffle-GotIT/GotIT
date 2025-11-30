"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/components/icons";
import { GlassButton } from "@/components/ui/GlassButton";
import { useDropdown } from "@/hooks/useDropdown";

interface ProfileDropdownProps {
	photoURL?: string | null;
	email?: string | null;
	onLogout: () => void;
}

export function ProfileDropdown({
	photoURL,
	email,
	onLogout,
}: ProfileDropdownProps) {
	const { isOpen, toggle, close, dropdownRef } = useDropdown<HTMLDivElement>();
	const router = useRouter();

	const handleDashboardClick = () => {
		close();
		router.push("/dashboard");
	};

	const handleLogoutClick = () => {
		close();
		onLogout();
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<GlassButton
				variant="rounded"
				className="p-1.5"
				aria-label="프로필"
				onClick={toggle}
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
}
