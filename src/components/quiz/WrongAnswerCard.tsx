"use client";

import Link from "next/link";
import type { QuizQuestion } from "@/lib/quiz";

interface WrongAnswerCardProps {
	question: QuizQuestion;
	userAnswer: string | null;
}

export function WrongAnswerCard({
	question,
	userAnswer,
}: WrongAnswerCardProps) {
	return (
		<div className="glass outline-white-30 flex flex-col gap-4 rounded-2xl bg-white/5 p-6 outline outline-[0.5px]">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className="rounded-lg bg-red-500/20 px-2 py-1 text-xs font-bold text-red-300">
							오답
						</span>
						<Link
							href={`/terms/${question.term.slug}`}
							className="hover:text-primary-300 text-lg font-bold text-gray-50 transition-colors"
						>
							{question.term.termKo}
						</Link>
					</div>
					<p className="text-sm text-neutral-400">
						{question.questionType === "summary"
							? question.term.summary
							: `"${question.term.termKo}"의 설명`}
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<span className="text-sm text-neutral-400">내 답변:</span>
					<span className="text-sm font-semibold text-red-300">
						{userAnswer || "(미응답)"}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-neutral-400">정답:</span>
					<span className="text-sm font-semibold text-green-300">
						{question.correctAnswer}
					</span>
				</div>
			</div>
		</div>
	);
}
