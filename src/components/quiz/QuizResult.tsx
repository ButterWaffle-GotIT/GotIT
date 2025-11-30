"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthCore, useScrap } from "@/contexts/auth";
import { useToast } from "@/contexts/ToastContext";
import {
	generateQuizQuestions,
	type QuizResult as QuizResultType,
	type QuizQuestion,
} from "@/lib/quiz";
import { type CategoryType } from "@/components/ui/category/config";
import GradientButton from "@/components/ui/buttons/GradientButton";

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
	const { toggleScrap, isScraped } = useScrap();
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
			let scrapCount = 0;
			for (const question of wrongQuestions) {
				const alreadyScraped = isScraped(question.term.id);
				if (!alreadyScraped) {
					await toggleScrap(question.term.id);
					scrapCount++;
				}
			}
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
			{/* 점수 카드 */}
			<div className="glass outline-white-30 flex w-full flex-col gap-6 rounded-3xl bg-white/5 p-10 outline outline-[0.5px]">
				<div className="flex items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<p className="text-lg text-neutral-400">총점</p>
						<p className="text-primary-400 text-7xl font-bold">
							{result.score}
						</p>
						<p className="text-2xl text-neutral-300">점</p>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-6">
						<p className="text-sm text-neutral-400">전체 문제</p>
						<p className="text-3xl font-bold text-white">
							{result.totalQuestions}
						</p>
					</div>
					<div className="flex flex-col items-center gap-2 rounded-2xl bg-green-500/10 p-6">
						<p className="text-sm text-green-400">정답</p>
						<p className="text-3xl font-bold text-green-300">
							{result.correctAnswers}
						</p>
					</div>
					<div className="flex flex-col items-center gap-2 rounded-2xl bg-red-500/10 p-6">
						<p className="text-sm text-red-400">오답</p>
						<p className="text-3xl font-bold text-red-300">
							{result.wrongAnswers}
						</p>
					</div>
				</div>
			</div>

			{/* 오답 노트 */}
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
							const userAnswer = result.userAnswers[originalIdx];

							return (
								<div
									key={idx}
									className="glass outline-white-30 flex flex-col gap-4 rounded-2xl bg-white/5 p-6 outline outline-[0.5px]"
								>
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
						})}
					</div>
				</div>
			)}

			{/* 액션 버튼 */}
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
