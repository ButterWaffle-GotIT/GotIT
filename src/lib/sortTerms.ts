import type { TermIndexItem } from "./terms";
import { sortByKorean, type SortType } from "@/utils/sorting";

export type { SortType };

/**
 * 용어 목록 정렬
 */
export function sortTerms(
	terms: TermIndexItem[],
	sortType: SortType
): TermIndexItem[] {
	if (sortType === "latest") {
		return terms;
	}

	return sortByKorean(terms, (term) => term.termKo);
}
