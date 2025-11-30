import { ScrapCardData } from "@/types/category";

export type SortType = "latest" | "alphabetical";

function getCharTypeOrder(str: string): number {
	if (!str) return 4;
	const char = str.charAt(0);

	if (/[0-9]/.test(char)) return 1;
	if (/[^0-9a-zA-Z가-힣]/.test(char)) return 2;
	if (/[가-힣]/.test(char)) return 3;
	return 4;
}

export function sortCards(cards: ScrapCardData[], sortType: SortType): ScrapCardData[] {
	return [...cards].sort((a, b) => {
		if (sortType === "latest") {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		} else {
			const termA = a.term;
			const termB = b.term;

			const priorityA = getCharTypeOrder(termA);
			const priorityB = getCharTypeOrder(termB);

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			return termA.localeCompare(termB, "ko", { sensitivity: "base" });
		}
	});
}
