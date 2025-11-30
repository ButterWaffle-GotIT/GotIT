/**
 * 카테고리 레거시 호환 및 타입 정의
 */

export {
	categoryIcons,
	categoryColors,
	categoryHoverStyles,
	categoryActiveStyles,
} from "@/config/categories";

/**
 * 스크랩 카드 데이터 인터페이스
 */
export interface ScrapCardData {
	id: string;
	slug?: string;
	category: string;
	term: string;
	tag: string;
	description: string;
	date: string;
}
