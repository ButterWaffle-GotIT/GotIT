"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import type { TermDetail, TermIndexItem, Conversation } from "@/lib/terms";
import { getRelatedTerms } from "@/lib/terms";
import {
	InfoIcon,
	CommentIcon,
	RelationIcon,
	HashtagIcon,
	PmIcon,
	EditIcon,
	ScrapIcon,
	ChevronRightIcon,
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
						<TabIcon size={16} color={isActive ? "#5375FF" : "#BDBDBD"} />
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

// 역할별 설정
const roleConfig = {
	pm: {
		label: "PM",
		color: "#FACC15",
		bgColor: "bg-[rgba(234,179,8,0.2)]",
		icon: PmIcon,
	},
	developer: {
		label: "Dev",
		color: "#22D3EE",
		bgColor: "bg-[rgba(6,182,212,0.2)]",
		icon: EditIcon,
	},
	designer: {
		label: "Designer",
		color: "#F472B6",
		bgColor: "bg-[rgba(236,72,153,0.2)]",
		icon: EditIcon,
	},
};

// UseCase Tab - 채팅 UI
function UseCaseTab({ term }: { term: TermDetail }) {
	const hasConversations =
		term.conversations && term.conversations.length > 0;

	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<CommentIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">
					실제 대화에서 이렇게 사용해요
				</h2>
			</div>

			{hasConversations ? (
				<div className="flex flex-col gap-4">
					{term.conversations!.map((conv, idx) => (
						<ConversationBubble key={idx} conversation={conv} />
					))}
				</div>
			) : (
				<p className="text-body5 text-gray-500">
					등록된 대화 상황이 없습니다.
				</p>
			)}
		</article>
	);
}

// 대화 버블 컴포넌트
function ConversationBubble({ conversation }: { conversation: Conversation }) {
	const config = roleConfig[conversation.role];
	const RoleIcon = config.icon;

	return (
		<div className="flex items-start gap-4">
			{/* 역할 아이콘 */}
			<div
				className={cn(
					"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
					config.bgColor
				)}
			>
				<RoleIcon size={20} color={config.color} />
			</div>

			{/* 대화 내용 */}
			<div className="bg-white-10 flex flex-col gap-1 rounded-xl px-7 py-3">
				<span
					className="text-body4 font-semibold"
					style={{ color: config.color }}
				>
					{config.label}
				</span>
				<p className="text-body4 text-white">
					&ldquo;{conversation.message}&rdquo;
				</p>
			</div>
		</div>
	);
}

// Related Tab - 카드 디자인
function RelatedTab({
	term,
	relatedTerms,
}: {
	term: TermDetail;
	relatedTerms: TermIndexItem[];
}) {
	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<RelationIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">연관 용어</h2>
			</div>

			{relatedTerms.length > 0 ? (
				<div className="flex flex-col gap-4">
					{relatedTerms.map((related) => (
						<RelatedTermCard key={related.id} term={related} />
					))}
				</div>
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

// 연관 용어 카드 컴포넌트
function RelatedTermCard({ term }: { term: TermIndexItem }) {
	const router = useRouter();
	const category = getCategoryFromTag(term.primaryTag);
	const config = categoryConfig[category];
	const CategoryIcon = config.icon;

	return (
		<div
			className="hover:bg-white-5 flex cursor-pointer flex-col gap-3 rounded-xl p-5 outline-1 outline-white/25 transition-colors"
			onClick={() => router.push(`/terms/${term.slug}`)}
		>
			{/* Header */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center justify-between">
					<div className="flex flex-1 items-center gap-2">
						{/* Category Icon */}
						<div
							className={cn(
								"flex h-6 w-6 items-center justify-center rounded-full outline-1 outline-white/25",
								config.bgColor
							)}
						>
							<CategoryIcon size={16} color="white" />
						</div>
						{/* Term Name */}
						<span className="text-subtitle1 text-gray-50">
							{term.termEn || term.termKo}
						</span>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-1">
						<button
							className="bg-white-10 flex h-6 w-6 items-center justify-center rounded"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<ScrapIcon size={16} color="#D4C2F0" />
						</button>
						<button className="bg-white-10 flex h-6 w-6 items-center justify-center rounded">
							<ChevronRightIcon size={16} color="#D4C2F0" />
						</button>
					</div>
				</div>

				{/* Aliases */}
				<div className="flex items-center gap-1">
					<HashtagIcon size={14} color="#9E9E9E" />
					<span className="text-[10px] leading-3.5 font-light text-gray-500">
						{term.termKo}
					</span>
				</div>
			</div>

			{/* Tags */}
			<div className="flex flex-wrap gap-1">
				<span
					className={cn(
						"rounded-full px-2 py-0.5 text-[10px] leading-3.5 font-light text-white",
						`bg-category-${category}/50`
					)}
				>
					# {term.primaryTag}
				</span>
				{term.tags
					.filter((tag) => tag !== term.primaryTag)
					.slice(0, 2)
					.map((tag, idx) => (
						<span
							key={idx}
							className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
						>
							# {tag}
						</span>
					))}
			</div>

			{/* Summary */}
			<p className="text-caption1 line-clamp-3 text-gray-400">{term.summary}</p>
		</div>
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
