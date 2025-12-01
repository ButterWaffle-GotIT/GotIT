"use client";

import Link from "next/link";
import { type QuizQuestion, type QuizResult } from "@/lib/quiz";
import { CATEGORIES, type CategoryType } from "@/config/categories";
import GradientButton from "@/components/ui/buttons/GradientButton";
import { useQuizState } from "@/hooks/useQuizState";

interface QuizSessionProps {
	questions: QuizQuestion[];
	category: CategoryType;
	onComplete: (result: QuizResult) => void;
}

export default function QuizSession({
	questions,
	category,
	onComplete,
}: QuizSessionProps) {
	const {
		currentQuestionIndex,
		currentQuestion,
		selectedAnswer,
		progress,
		answeredCount,
		isLastQuestion,
		isFirstQuestion,
		selectAnswer,
		goNext,
		goPrevious,
	} = useQuizState({ questions, onComplete });

	return (
		<div className="flex w-full flex-col items-center gap-8">
			{/* 헤더 */}
			<div className="flex w-full flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl font-bold text-white">
							{CATEGORIES[category].label} 퀴즈
						</h1>
						<p className="text-lg text-neutral-300">
							문제 {currentQuestionIndex + 1} / {questions.length}
						</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-neutral-400">답변한 문제</p>
						<p className="text-primary-400 text-2xl font-bold">
							{answeredCount} / {questions.length}
						</p>
					</div>
				</div>

				{/* 진행률 바 */}
				<div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
					<div
						className="from-primary-500 to-primary-600 h-full rounded-full bg-linear-to-r transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* 문제 카드 */}
			<div className="glass outline-white-30 flex w-full flex-col gap-8 rounded-3xl bg-white/5 p-10 outline outline-[0.5px]">
				{/* 문제 */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<span className="bg-primary-500/20 text-primary-300 rounded-lg px-3 py-1 text-sm font-medium">
							{currentQuestion.questionType === "summary"
								? "용어 맞추기"
								: "설명 맞추기"}
						</span>
						<Link
							href={`/terms/${currentQuestion.term.slug}`}
							target="_blank"
							className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/20 hover:text-white"
						>
							용어 보기 →
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						{currentQuestion.questionType === "summary" ? (
							<>
								<h3 className="text-lg font-medium text-gray-600">
									다음 설명에 해당하는 용어는?
								</h3>
								<p className="text-xl leading-relaxed font-semibold text-gray-100">
									{currentQuestion.term.summary}
								</p>
							</>
						) : (
							<>
								<h2 className="text-xl font-bold text-neutral-300">
									&quot;{currentQuestion.term.termKo}&quot;의 설명으로 올바른
									것은?
								</h2>
							</>
						)}
					</div>
				</div>

				{/* 선택지 */}
				<div className="grid grid-cols-1 gap-3">
					{currentQuestion.choices.map((choice, index) => {
						const isSelected = selectedAnswer === choice;
						const choiceLabel = ["A", "B", "C", "D"][index];

						return (
							<button
								key={index}
								onClick={() => selectAnswer(choice)}
								className={`glass flex items-start gap-4 rounded-2xl p-5 text-left outline outline-[0.5px] transition-all ${
									isSelected
										? "bg-primary-500/30 outline-primary-400 scale-[1.02]"
										: "outline-white-30 hover:outline-white-50 bg-white/5 hover:bg-white/10"
								}`}
							>
								<div
									className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-bold ${
										isSelected
											? "bg-primary-500 text-white"
											: "bg-white/10 text-neutral-400"
									}`}
								>
									{choiceLabel}
								</div>
								<span
									className={`text-lg leading-relaxed ${
										isSelected ? "font-semibold text-white" : "text-neutral-300"
									}`}
								>
									{choice}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* 네비게이션 버튼 */}
			<div className="flex w-full items-center justify-between">
				{!isFirstQuestion ? (
					<button
						onClick={goPrevious}
						className="px-6 py-3 font-semibold text-neutral-400 transition-all hover:text-white"
					>
						← 이전 문제
					</button>
				) : (
					<div />
				)}

				<GradientButton
					onClick={goNext}
					disabled={selectedAnswer === null}
					rounded="full"
				>
					{isLastQuestion ? "결과 보기" : "다음 문제 →"}
				</GradientButton>
			</div>
		</div>
	);
}
