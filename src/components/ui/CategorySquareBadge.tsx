import { cn } from "@/utils/cn";
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

export type CategoryType =
	| "all"
	| "frontend"
	| "backend"
	| "uiux"
	| "ai"
	| "cloud"
	| "data"
	| "security"
	| "devops"
	| "business";

interface CategorySquareBadgeProps {
	category: CategoryType;
	className?: string;
}

const categoryConfig = {
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
	uiux: {
		icon: CategoryUiuxIcon,
		bgColor: "bg-category-uiux",
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

export function CategorySquareBadge({
	category,
	className,
}: CategorySquareBadgeProps) {
	const config = categoryConfig[category];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"glass flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl",
				config.bgColor,
				className
			)}
		>
			<Icon size={42} color="white" />
		</div>
	);
}
