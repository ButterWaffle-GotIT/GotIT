import { cn } from "@/utils/cn";
import type { TermDetail, Conversation } from "@/lib/terms";
import { CommentIcon, PmIcon, EditIcon } from "@/components/icons";

interface UseCaseTabProps {
	term: TermDetail;
}

const roleConfig = {
	pm: {
		label: "PM",
		color: "#FACC15",
		bgColor: "bg-[rgba(234,179,8,0.2)]",
		icon: PmIcon,
	},
	developer: {
		label: "Dev",
		color: "#22D3EE",
		bgColor: "bg-[rgba(6,182,212,0.2)]",
		icon: EditIcon,
	},
	designer: {
		label: "Designer",
		color: "#F472B6",
		bgColor: "bg-[rgba(236,72,153,0.2)]",
		icon: EditIcon,
	},
};

export function UseCaseTab({ term }: UseCaseTabProps) {
	const hasConversations = term.conversations && term.conversations.length > 0;

	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<CommentIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">
					실제 대화에서 이렇게 사용해요
				</h2>
			</div>

			{hasConversations ? (
				<div className="flex flex-col gap-4">
					{term.conversations!.map((conv, idx) => (
						<ConversationBubble key={idx} conversation={conv} />
					))}
				</div>
			) : (
				<p className="text-body5 text-gray-500">등록된 대화 상황이 없습니다.</p>
			)}
		</article>
	);
}

// 대화 버블 컴포넌트
function ConversationBubble({ conversation }: { conversation: Conversation }) {
	const config = roleConfig[conversation.role];
	const RoleIcon = config.icon;

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
					&ldquo;{conversation.message}&rdquo;
				</p>
			</div>
		</div>
	);
}
