/**
 * 카테고리 설정
 */

import { ElementType } from "react";
import { CategoryAllIcon } from "@/components/icons/ic_category_all";
import { CategoryFrontendIcon } from "@/components/icons/ic_category_frontend";
import { CategoryBackendIcon } from "@/components/icons/ic_category_backend";
import { CategoryUiuxIcon } from "@/components/icons/ic_category_uiux";
import { CategoryAiIcon } from "@/components/icons/ic_category_ai";
import { CategoryCloudIcon } from "@/components/icons/ic_category_cloud";
import { CategoryDataIcon } from "@/components/icons/ic_category_data";
import { CategorySecurityIcon } from "@/components/icons/ic_category_security";
import { CategoryDevopsIcon } from "@/components/icons/ic_category_devops";
import { CategoryBusinessIcon } from "@/components/icons/ic_category_business";

/**
 * 카테고리 타입 정의
 */
export type CategoryType =
	| "all"
	| "frontend"
	| "backend"
	| "uxui"
	| "ai"
	| "cloud"
	| "data"
	| "security"
	| "devops"
	| "business";

/**
 * 카테고리별 세부 설정
 */
interface CategoryConfig {
	label: string;
	icon: ElementType;
	bgColor: string;
	hoverColor: string;
	selectedColor: string;
}

export const CATEGORIES: Record<CategoryType, CategoryConfig> = {
	all: {
		label: "전체",
		icon: CategoryAllIcon,
		bgColor: "bg-category-all",
		hoverColor: "hover:bg-[rgba(170,177,188,0.1)]",
		selectedColor: "bg-[rgba(170,177,188,0.5)]",
	},
	frontend: {
		label: "프론트엔드",
		icon: CategoryFrontendIcon,
		bgColor: "bg-category-frontend",
		hoverColor: "hover:bg-[rgba(38,199,239,0.1)]",
		selectedColor: "bg-[rgba(38,199,239,0.5)]",
	},
	backend: {
		label: "백엔드",
		icon: CategoryBackendIcon,
		bgColor: "bg-category-backend",
		hoverColor: "hover:bg-[rgba(18,168,73,0.1)]",
		selectedColor: "bg-[rgba(18,168,73,0.5)]",
	},
	uxui: {
		label: "UX/UI",
		icon: CategoryUiuxIcon,
		bgColor: "bg-category-uxui",
		hoverColor: "hover:bg-[rgba(244,94,143,0.1)]",
		selectedColor: "bg-[rgba(244,94,143,0.5)]",
	},
	ai: {
		label: "AI",
		icon: CategoryAiIcon,
		bgColor: "bg-category-ai",
		hoverColor: "hover:bg-[rgba(174,119,250,0.1)]",
		selectedColor: "bg-[rgba(174,119,250,0.5)]",
	},
	cloud: {
		label: "클라우드",
		icon: CategoryCloudIcon,
		bgColor: "bg-category-cloud",
		hoverColor: "hover:bg-[rgba(55,173,233,0.1)]",
		selectedColor: "bg-[rgba(55,173,233,0.5)]",
	},
	data: {
		label: "데이터",
		icon: CategoryDataIcon,
		bgColor: "bg-category-data",
		hoverColor: "hover:bg-[rgba(38,205,174,0.1)]",
		selectedColor: "bg-[rgba(38,205,174,0.5)]",
	},
	security: {
		label: "보안/네트워크",
		icon: CategorySecurityIcon,
		bgColor: "bg-category-security",
		hoverColor: "hover:bg-[rgba(246,114,64,0.1)]",
		selectedColor: "bg-[rgba(246,114,64,0.5)]",
	},
	devops: {
		label: "DevOps",
		icon: CategoryDevopsIcon,
		bgColor: "bg-category-devops",
		hoverColor: "hover:bg-[rgba(251,175,33,0.1)]",
		selectedColor: "bg-[rgba(251,175,33,0.5)]",
	},
	business: {
		label: "IT비즈니스",
		icon: CategoryBusinessIcon,
		bgColor: "bg-category-business",
		hoverColor: "hover:bg-[rgba(98,135,246,0.1)]",
		selectedColor: "bg-[rgba(98,135,246,0.5)]",
	},
} as const;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryType[];

export const CATEGORY_ROWS: [CategoryType[], CategoryType[]] = [
	["all", "frontend", "backend", "uxui", "ai"],
	["cloud", "data", "security", "devops", "business"],
];

export const SELECTABLE_CATEGORIES = CATEGORY_KEYS.filter(
	(key) => key !== "all"
) as Exclude<CategoryType, "all">[];

/**
 * 영문 카테고리 타입 → 한글 라벨 매핑
 */
export function getCategoryLabel(category: string): string {
	return CATEGORIES[category as CategoryType]?.label || category;
}

/**
 * 한글 라벨 → 영문 카테고리 타입 역매핑
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
 * 한글 라벨 → 영문 카테고리 타입 변환
 */
export function getCategoryType(label: string): CategoryType {
	return LABEL_TO_CATEGORY[label] || "all";
}
