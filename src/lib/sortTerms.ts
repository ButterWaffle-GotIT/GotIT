import type { TermIndexItem } from "./terms";

export type SortType = "latest" | "alphabetical";

function getCharTypeOrder(str: string): number {
	if (!str) return 4;
	const char = str.charAt(0);

	if (/[0-9]/.test(char)) return 1;
	if (/[^0-9a-zA-Z가-힣]/.test(char)) return 2;
	if (/[가-힣]/.test(char)) return 3;
	return 4;
}

export function sortTerms(
	terms: TermIndexItem[],
	sortType: SortType
): TermIndexItem[] {
	if (sortType === "latest") {
		// For search results, "latest" maintains original order
		// (search results don't have timestamps)
		return terms;
	} else {
		// Alphabetical sorting by termKo
		return [...terms].sort((a, b) => {
			const termA = a.termKo;
			const termB = b.termKo;

			const priorityA = getCharTypeOrder(termA);
			const priorityB = getCharTypeOrder(termB);

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			return termA.localeCompare(termB, "ko", { sensitivity: "base" });
		});
	}
}
