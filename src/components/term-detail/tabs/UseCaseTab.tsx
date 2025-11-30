import { cn } from "@/utils/cn";
import type { TermDetail, UseCase, Role } from "@/lib/terms";
import { CommentIcon, PmIcon, EditIcon } from "@/components/icons";

interface UseCaseTabProps {
	term: TermDetail;
}

interface RoleConfig {
	label: string;
	color: string;
	bgColor: string;
	icon: typeof PmIcon;
}

const roleConfig: Record<Role, RoleConfig> = {
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

export function UseCaseTab({ term }: UseCaseTabProps) {
	const hasUseCases = term.useCases && term.useCases.length > 0;

	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<CommentIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">
					실제 대화에서 이렇게 사용해요
				</h2>
			</div>

			{hasUseCases ? (
				<div className="flex flex-col gap-4">
					{term.useCases!.map((useCase, idx) => (
						<UseCaseBubble key={idx} useCase={useCase} term={term} />
					))}
				</div>
			) : (
				<p className="text-body5 text-gray-500">등록된 사용 사례가 없습니다.</p>
			)}
		</article>
	);
}

// 사용 사례 버블 컴포넌트
function UseCaseBubble({
	useCase,
	term,
}: {
	useCase: UseCase;
	term: TermDetail;
}) {
	const config = roleConfig[useCase.role];
	const RoleIcon = config.icon;

	const highlightTerm = (text: string) => {
		const termsToHighlight = [
			term.term.ko,
			term.term.en,
			...(term.aliases || []),
		].filter(Boolean);

		const regex = new RegExp(
			`(${termsToHighlight.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
			"gi"
		);

		const parts = text.split(regex);

		return parts.map((part, index) => {
			const isMatch = termsToHighlight.some(
				(t) => t.toLowerCase() === part.toLowerCase()
			);

			if (isMatch) {
				return (
					<span key={index} className="font-semibold text-[#9F74D8]">
						{part}
					</span>
				);
			}
			return part;
		});
	};

	return (
		<div className="flex items-start gap-4">
			{/* 역할 아이콘 */}
			<div
				className={cn(
					"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
					config.bgColor
				)}
			>
				<RoleIcon size={20} color={config.color} />
			</div>

			{/* 대화 내용 */}
			<div className="bg-white-10 flex flex-col gap-1 rounded-xl px-7 py-3">
				<span
					className="text-body4 font-semibold"
					style={{ color: config.color }}
				>
					{config.label}
				</span>
				<p className="text-body4 text-white">
					&ldquo;{highlightTerm(useCase.text)}&rdquo;
				</p>
			</div>
		</div>
	);
}
