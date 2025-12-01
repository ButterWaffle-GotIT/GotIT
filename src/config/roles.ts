/**
 * 역할(Role) 관련 설정
 */

import type { Role } from "@/types/terms";
import { CommentIcon, PmIcon, EditIcon } from "@/components/icons";

export interface RoleConfig {
	label: string;
	color: string;
	bgColor: string;
	icon: typeof PmIcon;
}

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
	PM: {
		label: "PM",
		color: "#FACC15",
		bgColor: "bg-[rgba(234,179,8,0.2)]",
		icon: PmIcon,
	},
	Dev: {
		label: "Dev",
		color: "#22D3EE",
		bgColor: "bg-[rgba(6,182,212,0.2)]",
		icon: EditIcon,
	},
	Design: {
		label: "Design",
		color: "#F472B6",
		bgColor: "bg-[rgba(236,72,153,0.2)]",
		icon: EditIcon,
	},
	Marketer: {
		label: "Marketer",
		color: "#A78BFA",
		bgColor: "bg-[rgba(167,139,250,0.2)]",
		icon: CommentIcon,
	},
	Other: {
		label: "Other",
		color: "#9CA3AF",
		bgColor: "bg-[rgba(156,163,175,0.2)]",
		icon: CommentIcon,
	},
};
