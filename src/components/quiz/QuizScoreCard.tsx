"use client";

import type { QuizResult } from "@/lib/quiz";

interface QuizScoreCardProps {
	result: QuizResult;
}

export function QuizScoreCard({ result }: QuizScoreCardProps) {
	return (
		<div className="glass outline-white-30 flex w-full flex-col gap-6 rounded-3xl bg-white/5 p-10 outline outline-[0.5px]">
			<div className="flex items-center justify-center">
				<div className="flex flex-col items-center gap-2">
					<p className="text-lg text-neutral-400">총점</p>
					<p className="text-primary-400 text-7xl font-bold">{result.score}</p>
					<p className="text-2xl text-neutral-300">점</p>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-6">
					<p className="text-sm text-neutral-400">전체 문제</p>
					<p className="text-3xl font-bold text-white">{result.totalQuestions}</p>
				</div>
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-green-500/10 p-6">
					<p className="text-sm text-green-400">정답</p>
					<p className="text-3xl font-bold text-green-300">
						{result.correctAnswers}
					</p>
				</div>
				<div className="flex flex-col items-center gap-2 rounded-2xl bg-red-500/10 p-6">
					<p className="text-sm text-red-400">오답</p>
					<p className="text-3xl font-bold text-red-300">{result.wrongAnswers}</p>
				</div>
			</div>
		</div>
	);
}
