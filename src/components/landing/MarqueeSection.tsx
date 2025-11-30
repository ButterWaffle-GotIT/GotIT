import { MarqueeText } from "./MarqueeText";

export function MarqueeSection() {
	return (
		<section className="flex h-screen snap-start snap-always items-center overflow-hidden border-y border-gray-800 px-12 py-6 md:px-24 lg:px-60">
			<MarqueeText />
		</section>
	);
}
