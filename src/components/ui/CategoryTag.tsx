import { cn } from "@/utils/cn";
import { CategoryChip } from "./CategoryChip";

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

interface CategoryTagProps {
	category: CategoryType;
	selected?: boolean;
	className?: string;
}

const categoryLabels = {
	all: "전체",
	frontend: "프론트엔드",
	backend: "백엔드",
	uiux: "UI/UX",
	ai: "AI",
	cloud: "클라우드",
	data: "데이터",
	security: "보안/네트워크",
	devops: "DevOps",
	business: "IT비즈니스",
} as const;

const categoryHoverColors = {
	all: "hover:bg-[rgba(170,177,188,0.1)]",
	frontend: "hover:bg-[rgba(38,199,239,0.1)]",
	backend: "hover:bg-[rgba(18,168,73,0.1)]",
	uiux: "hover:bg-[rgba(244,94,143,0.1)]",
	ai: "hover:bg-[rgba(174,119,250,0.1)]",
	cloud: "hover:bg-[rgba(55,173,233,0.1)]",
	data: "hover:bg-[rgba(38,205,174,0.1)]",
	security: "hover:bg-[rgba(246,114,64,0.1)]",
	devops: "hover:bg-[rgba(251,175,33,0.1)]",
	business: "hover:bg-[rgba(98,135,246,0.1)]",
} as const;

const categorySelectedColors = {
	all: "bg-[rgba(170,177,188,0.5)]",
	frontend: "bg-[rgba(38,199,239,0.5)]",
	backend: "bg-[rgba(18,168,73,0.5)]",
	uiux: "bg-[rgba(244,94,143,0.5)]",
	ai: "bg-[rgba(174,119,250,0.5)]",
	cloud: "bg-[rgba(55,173,233,0.5)]",
	data: "bg-[rgba(38,205,174,0.5)]",
	security: "bg-[rgba(246,114,64,0.5)]",
	devops: "bg-[rgba(251,175,33,0.5)]",
	business: "bg-[rgba(98,135,246,0.5)]",
} as const;

export function CategoryTag({
	category,
	selected = false,
	className,
}: CategoryTagProps) {
	const label = categoryLabels[category];
	const hoverColor = categoryHoverColors[category];
	const selectedColor = categorySelectedColors[category];

	return (
		<div
			className={cn(
				"glass flex w-fit items-center justify-center gap-2 overflow-visible rounded-xl border-[0.25px] border-white px-5 py-2 transition-colors",
				selected ? selectedColor : "bg-white-5",
				!selected && hoverColor,
				className
			)}
		>
			<CategoryChip category={category} />
			<div className="flex items-center gap-0.5">
				<span className="text-body5 leading-6 font-bold text-white">
					#{label}
				</span>
			</div>
		</div>
	);
}
