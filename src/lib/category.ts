import { CategoryType } from "@/components/ui/category/config";

/**
 * 영문 카테고리 타입 → 한글 카테고리명 매핑
 */
export const CATEGORY_LABELS: Record<string, string> = {
	all: "전체",
	frontend: "프론트엔드",
	backend: "백엔드",
	uxui: "UX/UI",
	ai: "AI",
	cloud: "클라우드",
	data: "데이터",
	security: "보안/네트워크",
	devops: "DevOps",
	business: "IT비즈니스",
};

/**
 * 한글 카테고리명 → 영문 카테고리 타입 매핑
 */
const LABEL_TO_CATEGORY: Record<string, CategoryType> = {
	전체: "all",
	프론트엔드: "frontend",
	백엔드: "backend",
	"UX/UI": "uxui",
	"UI/UX": "uxui",
	"UX/UI디자인": "uxui",
	"UI/UX디자인": "uxui",
	AI: "ai",
	클라우드: "cloud",
	데이터: "data",
	"보안/네트워크": "security",
	"보안-네트워크": "security",
	DevOps: "devops",
	IT비즈니스: "business",
};

/**
 * 영문 카테고리 타입을 한글 카테고리명으로 변환
 */
export function getCategoryLabel(category: string): string {
	return CATEGORY_LABELS[category] || category;
}

/**
 * 한글 카테고리명 또는 태그를 영문 카테고리 타입으로 변환
 */
export function getCategoryType(label: string): CategoryType {
	return LABEL_TO_CATEGORY[label] || "all";
}
