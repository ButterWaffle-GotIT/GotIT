import { MarqueeText } from "./MarqueeText";

export function MarqueeSection() {
	return (
		<section className="overflow-hidden border-y border-gray-800 py-6">
			<MarqueeText />
		</section>
	);
}
