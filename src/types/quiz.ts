/**
 * 퀴즈 관련 타입 정의
 */

import type { TermIndexItem } from "./terms";

export interface QuizQuestion {
	term: TermIndexItem;
	correctAnswer: string;
	choices: string[];
	questionType: "summary" | "term";
}

export interface QuizResult {
	totalQuestions: number;
	correctAnswers: number;
	wrongAnswers: number;
	score: number;
	questions: QuizQuestion[];
	userAnswers: (string | null)[];
}
