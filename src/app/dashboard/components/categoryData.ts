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

export const categoryIcons: Record<string, ElementType> = {
	전체: CategoryAllIcon,
	프론트엔드: CategoryFrontendIcon,
	백엔드: CategoryBackendIcon,
	"UI/UX": CategoryUiuxIcon,
	AI: CategoryAiIcon,
	클라우드: CategoryCloudIcon,
	데이터: CategoryDataIcon,
	"보안/네트워크": CategorySecurityIcon,
	DevOps: CategoryDevopsIcon,
	IT비즈니스: CategoryBusinessIcon,
};

export const categoryColors: Record<string, string> = {
	전체: "bg-gray-400",
	프론트엔드: "bg-cyan-400",
	백엔드: "bg-green-600",
	"UI/UX": "bg-rose-400",
	AI: "bg-violet-400",
	클라우드: "bg-sky-400",
	데이터: "bg-teal-400",
	"보안/네트워크": "bg-orange-400",
	DevOps: "bg-amber-400",
	IT비즈니스: "bg-blue-400",
};

export interface ScrapCardData {
	id: string;
	category: string;
	term: string;
	tag: string;
	description: string;
	date: string;
}
