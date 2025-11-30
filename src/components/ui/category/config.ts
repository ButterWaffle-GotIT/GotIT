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

// Category Types
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

// Category Configuration (Icons & Colors)
export const categoryConfig = {
	all: {
		icon: CategoryAllIcon,
		bgColor: "bg-category-all",
	},
	frontend: {
		icon: CategoryFrontendIcon,
		bgColor: "bg-category-frontend",
	},
	backend: {
		icon: CategoryBackendIcon,
		bgColor: "bg-category-backend",
	},
	uxui: {
		icon: CategoryUiuxIcon,
		bgColor: "bg-category-uxui",
	},
	ai: {
		icon: CategoryAiIcon,
		bgColor: "bg-category-ai",
	},
	cloud: {
		icon: CategoryCloudIcon,
		bgColor: "bg-category-cloud",
	},
	data: {
		icon: CategoryDataIcon,
		bgColor: "bg-category-data",
	},
	security: {
		icon: CategorySecurityIcon,
		bgColor: "bg-category-security",
	},
	devops: {
		icon: CategoryDevopsIcon,
		bgColor: "bg-category-devops",
	},
	business: {
		icon: CategoryBusinessIcon,
		bgColor: "bg-category-business",
	},
} as const;

// Category Labels (Korean)
export const categoryLabels = {
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
} as const;

// Category Hover Colors (for CategoryTag)
export const categoryHoverColors = {
	all: "hover:bg-[rgba(170,177,188,0.1)]",
	frontend: "hover:bg-[rgba(38,199,239,0.1)]",
	backend: "hover:bg-[rgba(18,168,73,0.1)]",
	uxui: "hover:bg-[rgba(244,94,143,0.1)]",
	ai: "hover:bg-[rgba(174,119,250,0.1)]",
	cloud: "hover:bg-[rgba(55,173,233,0.1)]",
	data: "hover:bg-[rgba(38,205,174,0.1)]",
	security: "hover:bg-[rgba(246,114,64,0.1)]",
	devops: "hover:bg-[rgba(251,175,33,0.1)]",
	business: "hover:bg-[rgba(98,135,246,0.1)]",
} as const;

// Category Selected Colors (for CategoryTag)
export const categorySelectedColors = {
	all: "bg-[rgba(170,177,188,0.5)]",
	frontend: "bg-[rgba(38,199,239,0.5)]",
	backend: "bg-[rgba(18,168,73,0.5)]",
	uxui: "bg-[rgba(244,94,143,0.5)]",
	ai: "bg-[rgba(174,119,250,0.5)]",
	cloud: "bg-[rgba(55,173,233,0.5)]",
	data: "bg-[rgba(38,205,174,0.5)]",
	security: "bg-[rgba(246,114,64,0.5)]",
	devops: "bg-[rgba(251,175,33,0.5)]",
	business: "bg-[rgba(98,135,246,0.5)]",
} as const;
