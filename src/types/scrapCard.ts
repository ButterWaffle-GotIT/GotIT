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
