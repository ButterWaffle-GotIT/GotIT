"use client";

import { useState, useCallback } from "react";
import { calculateQuizResult, type QuizQuestion, type QuizResult } from "@/lib/quiz";

interface UseQuizStateProps {
	questions: QuizQuestion[];
	onComplete: (result: QuizResult) => void;
}

interface UseQuizStateReturn {
	currentQuestionIndex: number;
	currentQuestion: QuizQuestion;
	selectedAnswer: string | null;
	userAnswers: (string | null)[];
	progress: number;
	answeredCount: number;
	isLastQuestion: boolean;
	isFirstQuestion: boolean;
	selectAnswer: (answer: string) => void;
	goNext: () => void;
	goPrevious: () => void;
}

export function useQuizState({
	questions,
	onComplete,
}: UseQuizStateProps): UseQuizStateReturn {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
		new Array(questions.length).fill(null)
	);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
	const answeredCount = userAnswers.filter((a) => a !== null).length;
	const isLastQuestion = currentQuestionIndex === questions.length - 1;
	const isFirstQuestion = currentQuestionIndex === 0;

	const selectAnswer = useCallback((answer: string) => {
		setSelectedAnswer(answer);
	}, []);

	const goNext = useCallback(() => {
		const newAnswers = [...userAnswers];
		newAnswers[currentQuestionIndex] = selectedAnswer;
		setUserAnswers(newAnswers);

		if (!isLastQuestion) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setSelectedAnswer(newAnswers[currentQuestionIndex + 1]);
		} else {
			const result = calculateQuizResult(questions, newAnswers);
			onComplete(result);
		}
	}, [currentQuestionIndex, selectedAnswer, userAnswers, isLastQuestion, questions, onComplete]);

	const goPrevious = useCallback(() => {
		if (!isFirstQuestion) {
			const newAnswers = [...userAnswers];
			newAnswers[currentQuestionIndex] = selectedAnswer;
			setUserAnswers(newAnswers);

			setCurrentQuestionIndex(currentQuestionIndex - 1);
			setSelectedAnswer(newAnswers[currentQuestionIndex - 1]);
		}
	}, [currentQuestionIndex, selectedAnswer, userAnswers, isFirstQuestion]);

	return {
		currentQuestionIndex,
		currentQuestion,
		selectedAnswer,
		userAnswers,
		progress,
		answeredCount,
		isLastQuestion,
		isFirstQuestion,
		selectAnswer,
		goNext,
		goPrevious,
	};
}
