"use client";

import { useState } from "react";
import CategorySelection from "@/components/quiz/CategorySelection";
import QuizSession from "@/components/quiz/QuizSession";
import QuizResult from "@/components/quiz/QuizResult";
import type { QuizQuestion, QuizResult as QuizResultType } from "@/lib/quiz";
import type { CategoryType } from "@/config/categories";

type QuizStage = "category" | "quiz" | "result";

export default function QuizPage() {
	const [stage, setStage] = useState<QuizStage>("category");
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
		null
	);
	const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [result, setResult] = useState<QuizResultType | null>(null);

	const handleCategorySelect = (
		category: CategoryType,
		quizQuestions: QuizQuestion[]
	) => {
		setSelectedCategory(category);
		setQuestions(quizQuestions);
		setStage("quiz");
	};

	const handleQuizComplete = (quizResult: QuizResultType) => {
		setResult(quizResult);
		setStage("result");
	};

	const handleRestart = () => {
		setStage("category");
		setSelectedCategory(null);
		setQuestions([]);
		setResult(null);
	};

	const handleRetry = (newQuestions: QuizQuestion[]) => {
		setQuestions(newQuestions);
		setStage("quiz");
	};

	return (
		<main className="flex min-h-screen w-full flex-col items-center">
			<div className="flex w-full max-w-[1040px] flex-col items-center gap-20 px-20 pt-20 pb-20">
				{stage === "category" && (
					<CategorySelection onCategorySelect={handleCategorySelect} />
				)}

				{stage === "quiz" && selectedCategory && (
					<QuizSession
						questions={questions}
						category={selectedCategory}
						onComplete={handleQuizComplete}
					/>
				)}

				{stage === "result" && result && selectedCategory && (
					<QuizResult
						result={result}
						onRestart={handleRestart}
						onRetry={handleRetry}
						category={selectedCategory}
					/>
				)}
			</div>
		</main>
	);
}
