"use client";

import { useRef } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeSection } from "@/components/landing/MarqueeSection";
import { ValuePropSection } from "@/components/landing/ValuePropSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={containerRef} className="relative">
			<HeroSection />
			<MarqueeSection />
			<ValuePropSection />
			<FeaturesSection />
			<StatsSection />
			<CTASection />
			<Footer />
		</div>
	);
}
