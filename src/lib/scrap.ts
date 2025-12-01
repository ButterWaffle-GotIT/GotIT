import type { TermIndexItem } from "@/lib/terms";
import type { ScrapCardData } from "@/types/scrapCard";
import { getCategoryLabel, getCategoryType } from "@/config/categories";
import { formatKoreanDate } from "@/utils/date";

/**
 * TermIndexItem을 ScrapCardData로 변환
 */
export function termToScrapCard(term: TermIndexItem): ScrapCardData {
	const categoryType = getCategoryType(term.primaryTag);
	const category = getCategoryLabel(categoryType);

	return {
		id: String(term.id),
		slug: term.slug,
		category,
		term: term.termEn || term.termKo,
		tag: term.tags[0] || "",
		description: term.summary,
		date: formatKoreanDate(),
	};
}
