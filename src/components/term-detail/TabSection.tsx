"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import type { TermDetail, TermIndexItem } from "@/lib/terms";
import { getRelatedTerms } from "@/lib/terms";
import {
	InfoIcon,
	CommentIcon,
	RelationIcon,
	HashtagIcon,
} from "@/components/icons";
import { categoryConfig } from "@/components/ui/category/config";
import { type TabType, getCategoryFromTag } from "./types";

interface TabSectionProps {
	term: TermDetail;
	relatedTerms: TermIndexItem[];
}

interface TabItem {
	id: TabType;
	label: string;
	icon: React.ComponentType<{ size?: number; color?: string }>;
}

const tabs: TabItem[] = [
	{ id: "description", label: "상세 설명", icon: InfoIcon },
	{ id: "usecase", label: "대화 상황", icon: CommentIcon },
	{ id: "related", label: "연관 용어", icon: RelationIcon },
];

export function TabSection({ term, relatedTerms }: TabSectionProps) {
	const [activeTab, setActiveTab] = useState<TabType>("description");

	return (
		<section className="flex flex-col gap-5">
			{/* Tab Navigation */}
			<TabNavigation
				activeTab={activeTab}
				onTabChange={setActiveTab}
			/>

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

// Tab Navigation
function TabNavigation({
	activeTab,
	onTabChange,
}: {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}) {
	return (
		<nav className="flex items-center gap-5">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id;
				const TabIcon = tab.icon;
				return (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={cn(
							"flex h-8 items-center gap-1.5 rounded-lg px-3 transition-colors",
							isActive ? "bg-tertiary-500/20" : "hover:bg-white-10"
						)}
					>
						<TabIcon
							size={16}
							color={isActive ? "#5375FF" : "#BDBDBD"}
						/>
						<span
							className={cn(
								"text-button-medium",
								isActive ? "text-tertiary-500" : "text-gray-400"
							)}
						>
							{tab.label}
						</span>
					</button>
				);
			})}
		</nav>
	);
}

// Description Tab
function DescriptionTab({ term }: { term: TermDetail }) {
	const category = getCategoryFromTag(term.primaryTag);

	return (
		<>
			{/* Description Card */}
			<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
				<div className="flex items-center gap-2">
					<InfoIcon size={24} color="#9F74D8" />
					<h2 className="text-subtitle1 text-gray-500">상세 설명</h2>
				</div>
				<p className="text-body4 whitespace-pre-line text-white">
					{term.description}
				</p>
			</article>

			{/* Keywords Card */}
			{term.keywords && term.keywords.length > 0 && (
				<article className="flex flex-col gap-4 rounded-xl border border-gray-800 p-7">
					<div className="flex items-center gap-2">
						<HashtagIcon size={24} color="#9F74D8" />
						<h2 className="text-subtitle1 text-gray-500">관련 키워드</h2>
					</div>
					<div className="flex flex-wrap gap-1">
						{/* Primary Tag */}
						<span
							className={cn(
								"rounded-full px-2 py-0.5 text-[10px] leading-3.5 font-light text-white",
								`bg-category-${category}/50`
							)}
						>
							# {term.primaryTag}
						</span>
						{/* Other Tags */}
						{term.tags
							.filter((tag) => tag !== term.primaryTag)
							.map((tag, idx) => (
								<span
									key={idx}
									className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
								>
									# {tag}
								</span>
							))}
						{/* Keywords */}
						{term.keywords.map((keyword, idx) => (
							<span
								key={idx}
								className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
							>
								# {keyword}
							</span>
						))}
					</div>
				</article>
			)}
		</>
	);
}

// UseCase Tab
function UseCaseTab({ term }: { term: TermDetail }) {
	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<CommentIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">대화 상황</h2>
			</div>
			{term.useCases && term.useCases.length > 0 ? (
				<ul className="flex flex-col gap-3">
					{term.useCases.map((useCase, idx) => (
						<li key={idx} className="text-body4 text-white">
							• {useCase}
						</li>
					))}
				</ul>
			) : (
				<p className="text-body5 text-gray-500">
					등록된 대화 상황이 없습니다.
				</p>
			)}
		</article>
	);
}

// Related Tab
function RelatedTab({
	term,
	relatedTerms,
}: {
	term: TermDetail;
	relatedTerms: TermIndexItem[];
}) {
	const router = useRouter();

	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<RelationIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">연관 용어</h2>
			</div>
			{relatedTerms.length > 0 ? (
				<ul className="flex flex-col gap-3">
					{relatedTerms.map((related) => {
						const { config } = {
							config: categoryConfig[getCategoryFromTag(related.primaryTag)],
						};
						const RelatedIcon = config.icon;
						return (
							<li key={related.id}>
								<button
									onClick={() => router.push(`/terms/${related.slug}`)}
									className="hover:bg-white-5 flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
								>
									<div
										className={cn(
											"flex h-8 w-8 items-center justify-center rounded-lg",
											config.bgColor
										)}
									>
										<RelatedIcon size={20} color="white" />
									</div>
									<div className="flex flex-col">
										<span className="text-body5 font-medium text-white">
											{related.termKo}
										</span>
										<span className="text-caption1 line-clamp-1 text-gray-500">
											{related.summary}
										</span>
									</div>
								</button>
							</li>
						);
					})}
				</ul>
			) : (
				<p className="text-body5 text-gray-500">연관 용어가 없습니다.</p>
			)}

			{/* Confusable Terms */}
			{term.confusableIds && term.confusableIds.length > 0 && (
				<ConfusableTerms ids={term.confusableIds} />
			)}
		</article>
	);
}

// Confusable Terms
function ConfusableTerms({ ids }: { ids: number[] }) {
	const router = useRouter();
	const [terms, setTerms] = useState<TermIndexItem[]>([]);

	useEffect(() => {
		getRelatedTerms(ids).then(setTerms);
	}, [ids]);

	if (terms.length === 0) return null;

	return (
		<div className="mt-4 border-t border-gray-800 pt-4">
			<p className="text-caption1 mb-2 text-gray-500">헷갈리기 쉬운 용어</p>
			<ul className="flex flex-col gap-2">
				{terms.map((t) => (
					<li key={t.id}>
						<button
							onClick={() => router.push(`/terms/${t.slug}`)}
							className="hover:bg-white-5 flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors"
						>
							<span className="text-body5 text-white">{t.termKo}</span>
							<span className="text-caption1 text-gray-600">vs</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
