"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePropSection } from "@/components/landing/ValuePropSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";

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
