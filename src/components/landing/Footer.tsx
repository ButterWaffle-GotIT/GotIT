import { LogoText } from "@/components/icons";

export function Footer() {
	return (
		<footer className="h-screen flex items-center border-t border-gray-800 px-12 md:px-24 lg:px-60 py-12 snap-start snap-always">
			<div className="mx-auto flex max-w-6xl items-center justify-between w-full">
				<LogoText width={89} height={30} />
				<p className="text-xs text-gray-600">© 2025</p>
			</div>
		</footer>
	);
}
