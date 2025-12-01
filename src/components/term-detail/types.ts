import { CATEGORIES, getCategoryType } from "@/config/categories";

export function getCategoryConfig(tag: string) {
	const category = getCategoryType(tag);
	return {
		category,
		config: CATEGORIES[category],
	};
}

// 탭 타입
export type TabType = "description" | "usecase" | "related";
