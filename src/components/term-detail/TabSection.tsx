"use client";

import { useState } from "react";
import type { TermDetail, TermIndexItem } from "@/lib/terms";
import { type TabType } from "./types";
import { TabNavigation } from "./tabs/TabNavigation";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { UseCaseTab } from "./tabs/UseCaseTab";
import { RelatedTab } from "./tabs/RelatedTab";

interface TabSectionProps {
	term: TermDetail;
	relatedTerms: TermIndexItem[];
}

export function TabSection({ term, relatedTerms }: TabSectionProps) {
	const [activeTab, setActiveTab] = useState<TabType>("description");

	return (
		<section className="flex flex-col gap-5">
			{/* Tab Navigation */}
			<TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

			{/* Tab Content */}
			<div className="flex flex-col gap-5">
				{activeTab === "description" && <DescriptionTab term={term} />}
				{activeTab === "usecase" && <UseCaseTab term={term} />}
				{activeTab === "related" && (
					<RelatedTab term={term} relatedTerms={relatedTerms} />
				)}
			</div>
		</section>
	);
}
