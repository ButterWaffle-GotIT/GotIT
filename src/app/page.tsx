"use client";

import { useRef } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePropSection } from "@/components/landing/ValuePropSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";

export default function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 snap-y snap-mandatory overflow-y-scroll z-0"
		>
			<HeroSection />
			<ValuePropSection />
			<FeaturesSection />
			<CTASection />
		</div>
	);
}
