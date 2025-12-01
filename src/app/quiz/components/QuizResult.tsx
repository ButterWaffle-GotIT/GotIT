"use client";

import { useState } from "react";
import { useAuthCore, useScrap } from "@/contexts/auth";
import { useToast } from "@/contexts/ToastContext";
import {
	generateQuizQuestions,
	type QuizResult as QuizResultType,
	type QuizQuestion,
} from "@/lib/quiz";
import { type CategoryType } from "@/config/categories";
import GradientButton from "@/components/ui/buttons/GradientButton";
import { QuizScoreCard } from "./QuizScoreCard";
import { WrongAnswerCard } from "./WrongAnswerCard";

interface QuizResultProps {
	result: QuizResultType;
	category: CategoryType;
	onRestart: () => void;
	onRetry: (questions: QuizQuestion[]) => void;
}

export default function QuizResult({
	result,
	category,
	onRestart,
	onRetry,
}: QuizResultProps) {
	const { user } = useAuthCore();
	const { addMultipleToScrap } = useScrap();
	const { showToast } = useToast();
	const [isRetrying, setIsRetrying] = useState(false);

	const wrongQuestions = result.questions.filter(
		(q, idx) => result.userAnswers[idx] !== q.correctAnswer
	);

	const handleScrapWrongTerms = async () => {
		if (!user) {
			showToast("로그인이 필요합니다.", "error");
			return;
		}

		try {
			const termIds = wrongQuestions.map((q) => q.term.id);
			const scrapCount = await addMultipleToScrap(termIds);
			showToast(
				scrapCount > 0
					? `틀린 문제 ${scrapCount}개를 스크랩했습니다!`
					: "이미 모든 문제가 스크랩되어 있습니다.",
				"success"
			);
		} catch {
			showToast("스크랩에 실패했습니다.", "error");
		}
	};

	const handleRetry = async () => {
		setIsRetrying(true);
		try {
			const newQuestions = await generateQuizQuestions(
				category,
				result.totalQuestions
			);
			onRetry(newQuestions);
		} catch {
			showToast("퀴즈 생성에 실패했습니다.", "error");
			setIsRetrying(false);
		}
	};

	return (
		<div className="flex w-full flex-col items-center gap-8">
			<QuizScoreCard result={result} />

			{wrongQuestions.length > 0 && (
				<div className="flex w-full flex-col gap-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold text-gray-50">
							오답 노트 ({wrongQuestions.length}개)
						</h2>
						{user && (
							<button
								onClick={handleScrapWrongTerms}
								className="text-primary-300 hover:bg-primary-500/20 rounded-xl px-4 py-2 text-sm font-bold transition-all"
							>
								틀린 문제 모두 스크랩
							</button>
						)}
					</div>

					<div className="flex flex-col gap-3">
						{wrongQuestions.map((question, idx) => {
							const originalIdx = result.questions.indexOf(question);
							return (
								<WrongAnswerCard
									key={idx}
									question={question}
									userAnswer={result.userAnswers[originalIdx]}
								/>
							);
						})}
					</div>
				</div>
			)}

			<div className="flex w-full items-center justify-center gap-4">
				<button
					onClick={onRestart}
					className="px-6 py-3 font-semibold text-neutral-400 transition-all hover:text-white"
				>
					처음으로
				</button>
				<GradientButton
					onClick={handleRetry}
					disabled={isRetrying}
					rounded="full"
				>
					{isRetrying ? "생성 중..." : "같은 카테고리로 다시 풀기"}
				</GradientButton>
			</div>
		</div>
	);
}
