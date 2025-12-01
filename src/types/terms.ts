/**
 * 용어 관련 타입 정의
 */

// Index 아이템 타입
export interface TermIndexItem {
	id: number;
	slug: string;
	termKo: string;
	termEn?: string;
	summary: string;
	tags: string[];
	primaryTag: string;
	level: "beginner" | "intermediate" | "advanced";
	file: string;
}

// 역할 타입
export type Role = "PM" | "Dev" | "Design" | "Marketer" | "Other";

// 사용 사례 타입
export interface UseCase {
	role: Role;
	text: string;
}

// 대화 상황 타입 (deprecated - useCases로 대체)
export interface Conversation {
	role: "pm" | "developer" | "designer";
	message: string;
}

// 상세 용어 타입
export interface TermDetail {
	id: number;
	slug: string;
	term: {
		ko: string;
		en: string;
	};
	aliases?: string[];
	summary: string;
	onelinerForNonTech?: string;
	description: string;
	tags: string[];
	primaryTag: string;
	relatedIds?: number[];
	confusableIds?: number[];
	useCases?: UseCase[];
	conversations?: Conversation[];
	keywords?: string[];
	level: "beginner" | "intermediate" | "advanced";
	updatedAt: string;
	status?: "draft" | "published";
}
