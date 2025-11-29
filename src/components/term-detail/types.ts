import { categoryConfig } from "@/components/ui/category/config";
import { getCategoryType } from "@/lib/category";

export function getCategoryConfig(tag: string) {
	const category = getCategoryType(tag);
	return {
		category,
		config: categoryConfig[category],
	};
}

// 탭 타입
export type TabType = "description" | "usecase" | "related";
