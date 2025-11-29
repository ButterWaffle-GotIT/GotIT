import { RobotIcon, LightIcon } from "@/components/icons";
import RecommendedQuestion from "./RecommendedQuestion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface ChatMessageProps {
	content: string;
	recommendations?: string[];
	onRecommendationClick: (question: string) => void;
}

export default function ChatMessage({
	content,
	recommendations,
	onRecommendationClick,
}: ChatMessageProps) {
	const formattedContent = content.replace(/<br\s*\/?>/gi, "\n").trim();

	return (
		<div className="flex items-start gap-3">
			<div className="from-brand-purple to-brand-red flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-[0.58331rem] bg-linear-to-r">
				<RobotIcon width={24} height={24} className="text-white" />
			</div>

			<div className="flex max-w-207 flex-col gap-[0.62rem]">
				<div className="text-body3 rounded-[0_1.25rem_1.25rem_1.25rem] border border-gray-700 bg-gray-900 px-8 py-7 leading-relaxed text-white">
					<ReactMarkdown
						remarkPlugins={[remarkGfm, remarkBreaks]}
						components={{
							p: ({ children }) => (
								<p className="mb-4 text-gray-100 last:mb-0">{children}</p>
							),
							strong: ({ children }) => (
								<span className="text-primary-400 mx-[3px] font-bold">
									{children}
								</span>
							),
							ul: ({ children }) => (
								<ul className="mb-4 list-disc space-y-2 pl-5 text-gray-200">
									{children}
								</ul>
							),
							ol: ({ children }) => (
								<ol className="mb-4 list-decimal space-y-2 pl-5 text-gray-200">
									{children}
								</ol>
							),
							li: ({ children }) => (
								<li className="pl-1 leading-normal">{children}</li>
							),
							h3: ({ children }) => (
								<h3 className="text-primary-300 mt-4 mb-2 text-base font-bold">
									{children}
								</h3>
							),
							a: ({ href, children }) => (
								<a
									href={href}
									className="text-blue-400 underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									{children}
								</a>
							),
						}}
					>
						{formattedContent}
					</ReactMarkdown>
				</div>

				{recommendations && recommendations.length > 0 && (
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1">
							<LightIcon width={20} height={20} className="text-gray-500" />
							<span className="text-caption1 text-gray-500">
								이런 것도 물어보세요
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{recommendations.slice(0, 3).map((rec, idx) => (
								<RecommendedQuestion
									key={idx}
									text={rec}
									onClick={() => onRecommendationClick(rec)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
