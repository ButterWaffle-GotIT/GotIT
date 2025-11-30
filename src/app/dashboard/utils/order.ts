import { ScrapCardData } from "@/types/category";
import { sortByKorean, sortByDateDesc, type SortType } from "@/utils/sorting";

export type { SortType };

/**
 * 스크랩 카드 정렬
 */
export function sortCards(
	cards: ScrapCardData[],
	sortType: SortType
): ScrapCardData[] {
	if (sortType === "latest") {
		return sortByDateDesc(cards, (card) => card.date);
	}

	return sortByKorean(cards, (card) => card.term);
}
