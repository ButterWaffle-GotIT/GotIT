import { cn } from "@/utils/cn";
import { InfoIcon, CommentIcon, RelationIcon } from "@/components/icons";
import { type TabType } from "../types";

interface TabItem {
	id: TabType;
	label: string;
	icon: React.ComponentType<{ size?: number; color?: string }>;
}

const tabs: TabItem[] = [
	{ id: "description", label: "상세 설명", icon: InfoIcon },
	{ id: "usecase", label: "대화 상황", icon: CommentIcon },
	{ id: "related", label: "연관 용어", icon: RelationIcon },
];

interface TabNavigationProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
	return (
		<nav className="flex items-center gap-5">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id;
				const TabIcon = tab.icon;
				return (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={cn(
							"flex h-8 items-center gap-1.5 rounded-lg px-3 transition-colors",
							isActive ? "bg-tertiary-500/20" : "hover:bg-white-10"
						)}
					>
						<TabIcon size={16} color={isActive ? "#5375FF" : "#BDBDBD"} />
						<span
							className={cn(
								"text-button-medium",
								isActive ? "text-tertiary-500" : "text-gray-400"
							)}
						>
							{tab.label}
						</span>
					</button>
				);
			})}
		</nav>
	);
}
