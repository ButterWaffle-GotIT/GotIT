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

export const categoryHoverStyles: Record<string, string> = {
	전체: "hover:bg-gray-400/10 hover:outline-white-50",
	프론트엔드: "hover:bg-cyan-400/10 hover:outline-white-50",
	백엔드: "hover:bg-green-600/10 hover:outline-white-50",
	"UI/UX": "hover:bg-rose-400/10 hover:outline-white-50",
	AI: "hover:bg-violet-400/10 hover:outline-white-50",
	클라우드: "hover:bg-sky-400/10 hover:outline-white-50",
	데이터: "hover:bg-teal-400/10 hover:outline-white-50",
	"보안/네트워크": "hover:bg-orange-400/10 hover:outline-white-50",
	DevOps: "hover:bg-amber-400/10 hover:outline-white-50",
	IT비즈니스: "hover:bg-blue-400/10 hover:outline-white-50",
};

export const categoryActiveStyles: Record<string, string> = {
	전체: "bg-gray-400/50 outline-white",
	프론트엔드: "bg-cyan-400/50 outline-white",
	백엔드: "bg-green-600/50 outline-white",
	"UI/UX": "bg-rose-400/50 outline-white",
	AI: "bg-violet-400/50 outline-white",
	클라우드: "bg-sky-400/50 outline-white",
	데이터: "bg-teal-400/50 outline-white",
	"보안/네트워크": "bg-orange-400/50 outline-white",
	DevOps: "bg-amber-400/50 outline-white",
	IT비즈니스: "bg-blue-400/50 outline-white",
};

export interface ScrapCardData {
	id: string;
	category: string;
	term: string;
	tag: string;
	description: string;
	date: string;
}
