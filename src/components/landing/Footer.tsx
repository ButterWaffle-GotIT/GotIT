import { LogoText } from "@/components/icons";

export function Footer() {
	return (
		<footer className="border-t border-gray-800 px-6 py-12 md:px-12 lg:px-24">
			<div className="mx-auto flex max-w-6xl items-center justify-between">
				<LogoText width={89} height={30} />
				<p className="text-xs text-gray-600">© 2025</p>
			</div>
		</footer>
	);
}
