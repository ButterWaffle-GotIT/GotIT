import { ScrapCardData } from "@/types/scrapCard";
import { sortByKorean, type SortType } from "@/utils/sorting";

export type { SortType };

/**
 * 스크랩 카드 정렬
 */
export function sortCards(
	cards: ScrapCardData[],
	sortType: SortType
): ScrapCardData[] {
	if (sortType === "latest") {
		return [...cards].reverse();
	}

	return sortByKorean(cards, (card) => card.term);
}
