import {
	type CategoryType,
	categoryConfig,
} from "@/components/ui/category/config";

// primaryTag(한글) → CategoryType 매핑
const tagToCategoryMap: Record<string, CategoryType> = {
	프론트엔드: "frontend",
	백엔드: "backend",
	"UI/UX": "uiux",
	"UI/UX디자인": "uiux",
	AI: "ai",
	클라우드: "cloud",
	데이터: "data",
	"보안/네트워크": "security",
	"보안-네트워크": "security",
	DevOps: "devops",
	IT비즈니스: "business",
	전체: "all",
};

export function getCategoryFromTag(tag: string): CategoryType {
	return tagToCategoryMap[tag] || "all";
}

export function getCategoryConfig(tag: string) {
	const category = getCategoryFromTag(tag);
	return {
		category,
		config: categoryConfig[category],
	};
}

// 탭 타입
export type TabType = "description" | "usecase" | "related";
