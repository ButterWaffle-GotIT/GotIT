"use client";

import { HeroSection } from "./components/HeroSection";
import { ValuePropSection } from "./components/ValuePropSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";

export default function HomePage() {
	return (
		<div className="fixed inset-0 z-0 snap-y snap-mandatory overflow-y-scroll">
			<HeroSection />
			<ValuePropSection />
			<FeaturesSection />
			<CTASection />
		</div>
	);
}
