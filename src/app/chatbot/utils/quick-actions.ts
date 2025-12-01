/**
 * 챗봇 퀵 액션 유틸리티
 */

import { getPopularTerms } from "@/lib/recommendations";
import { getTodaysTerm } from "@/lib/terms";
import type { CategoryType } from "@/config/categories";

/**
 * 인기 용어 3개 가져오기 (카테고리 기반)
 */
export async function getPopularTermsQuery(
	category: CategoryType = "all"
): Promise<string> {
	const terms = await getPopularTerms(category, 3);
	if (terms.length === 0) {
		return "React, Next.js, Docker 이 세 가지 용어를 각각 설명해줘.";
	}
	return `${terms.join(", ")} 이 세 가지 용어를 각각 설명해줘.`;
}

/**
 * 오늘의 용어 가져오기
 */
export async function getTodaysTermQuery(): Promise<string> {
	const todayTerm = await getTodaysTerm();
	if (!todayTerm) {
		return "TypeScript";
	}
	return todayTerm.termEn || todayTerm.termKo;
}
