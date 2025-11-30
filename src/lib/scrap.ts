import type { TermIndexItem } from "@/lib/terms";
import type { ScrapCardData } from "@/types/category";
import { getCategoryLabel } from "@/lib/category";

/**
 * TermIndexItem을 ScrapCardData로 변환
 */
export function termToScrapCard(term: TermIndexItem): ScrapCardData {
	const category = getCategoryLabel(term.primaryTag);

	return {
		id: String(term.id),
		slug: term.slug,
		category,
		term: term.termEn || term.termKo,
		tag: term.tags[0] || "",
		description: term.summary,
		date: new Date()
			.toLocaleDateString("ko-KR", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.replace(/\. /g, ".")
			.replace(/\.$/, ""),
	};
}
