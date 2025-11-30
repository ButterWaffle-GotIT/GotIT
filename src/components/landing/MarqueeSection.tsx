import { MarqueeText } from "./MarqueeText";

export function MarqueeSection() {
	return (
		<section className="h-screen flex items-center overflow-hidden border-y border-gray-800 py-6 px-12 md:px-24 lg:px-60 snap-start snap-always">
			<MarqueeText />
		</section>
	);
}
