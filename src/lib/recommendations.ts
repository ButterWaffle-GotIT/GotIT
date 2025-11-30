/**
 * 추천 용어 관련 유틸리티
 */

import { getTermsByCategory } from "./terms";
import type { CategoryType } from "@/components/ui/category/config";
import { categoryLabels } from "@/components/ui/category/config";

// 카테고리 ID 매핑
export const categoryIdMap: Record<Exclude<CategoryType, "all">, number> = {
	frontend: 1000,
	uxui: 1000,
	backend: 2000,
	cloud: 3000,
	devops: 3000,
	security: 3000,
	ai: 4000,
	data: 4000,
	business: 4000,
};

// 카테고리별 아이콘 색상
export const categoryColors: Record<number, string> = {
	1000: "bg-cyan-400", // 프론트엔드·UX/UI
	2000: "bg-green-500", // 백엔드
	3000: "bg-amber-400", // 클라우드·DevOps·보안
	4000: "bg-purple-500", // AI·데이터·IT비즈니스
};

/**
 * 랜덤 카테고리 선택 (all인 경우)
 */
export function getRandomCategory(): Exclude<CategoryType, "all"> {
	const categories = Object.keys(categoryIdMap) as Exclude<
		CategoryType,
		"all"
	>[];
	return categories[Math.floor(Math.random() * categories.length)];
}

export interface RecommendedTerm {
	term: string;
	category: string;
	description: string;
	iconColor: string;
	slug: string;
}

/**
 * 온보딩 카테고리 기반 추천 용어 가져오기
 */
export async function getRecommendedTerms(
	category: CategoryType,
	count: number = 6
): Promise<RecommendedTerm[]> {
	try {
		const targetCategory = category === "all" ? getRandomCategory() : category;
		const categoryId = categoryIdMap[targetCategory];

		const terms = await getTermsByCategory(categoryId);
		if (terms.length < count) {
			// 용어 개수가 부족하면 있는 만큼만 반환
			return terms.map((t) => ({
				term: t.termKo,
				category: categoryLabels[targetCategory],
				description: t.summary,
				iconColor: categoryColors[categoryId],
				slug: t.slug,
			}));
		}

		// Fisher-Yates 셔플로 랜덤 선택
		const shuffled = [...terms];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled.slice(0, count).map((t) => ({
			term: t.termKo,
			category: categoryLabels[targetCategory],
			description: t.summary,
			iconColor: categoryColors[categoryId],
			slug: t.slug,
		}));
	} catch (error) {
		console.error("추천 용어 로드 실패:", error);
		return [];
	}
}
