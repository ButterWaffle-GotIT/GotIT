import { LogoText } from "@/components/icons";

export function Footer() {
	return (
		<footer className="flex h-screen snap-start snap-always items-center border-t border-gray-800 px-12 py-12 md:px-24 lg:px-60">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between">
				<LogoText width={89} height={30} />
				<p className="text-xs text-gray-600">© 2025</p>
			</div>
		</footer>
	);
}
