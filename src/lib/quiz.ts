/**
 * 퀴즈 생성 및 관리 헬퍼
 */

import { getTermsIndex, getTermsByTag, type TermIndexItem } from "./terms";
import { CATEGORIES, type CategoryType } from "@/config/categories";

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

/**
 * 배열을 랜덤하게 섞기
 */
function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

/**
 * 카테고리별로 퀴즈 문제 생성
 */
export async function generateQuizQuestions(
	category: CategoryType,
	count: number = 10
): Promise<QuizQuestion[]> {
	// 카테고리에 해당하는 용어들 가져오기
	let terms: TermIndexItem[];

	if (category === "all") {
		const allTerms = await getTermsIndex();
		terms = shuffleArray(allTerms);
	} else {
		// CategoryType을 한글 이름으로 변환하여 검색
		const categoryLabel = CATEGORIES[category].label;
		terms = await getTermsByTag(categoryLabel);
		terms = shuffleArray(terms);
	}

	// 문제 수가 용어 수보다 많으면 조정
	const questionCount = Math.min(count, terms.length);

	if (questionCount < 4) {
		throw new Error("퀴즈를 생성하기에 용어가 부족합니다.");
	}

	const selectedTerms = terms.slice(0, questionCount);
	const questions: QuizQuestion[] = [];

	for (let i = 0; i < selectedTerms.length; i++) {
		const currentTerm = selectedTerms[i];

		// 랜덤으로 문제 유형 선택
		const questionType = Math.random() > 0.5 ? "summary" : "term";

		// 오답 선택지 생성
		const otherTerms = terms.filter((t) => t.id !== currentTerm.id);
		const wrongChoices = shuffleArray(otherTerms).slice(0, 3);

		let choices: string[];
		let correctAnswer: string;

		if (questionType === "summary") {
			// 설명을 보고 용어 맞추기
			correctAnswer = currentTerm.termKo;
			choices = shuffleArray([
				currentTerm.termKo,
				...wrongChoices.map((t) => t.termKo),
			]);
		} else {
			// 용어를 보고 설명 맞추기
			correctAnswer = currentTerm.summary;
			choices = shuffleArray([
				currentTerm.summary,
				...wrongChoices.map((t) => t.summary),
			]);
		}

		questions.push({
			term: currentTerm,
			correctAnswer,
			choices,
			questionType,
		});
	}

	return questions;
}

/**
 * 퀴즈 결과 계산
 */
export function calculateQuizResult(
	questions: QuizQuestion[],
	userAnswers: (string | null)[]
): QuizResult {
	let correctCount = 0;

	for (let i = 0; i < questions.length; i++) {
		if (userAnswers[i] === questions[i].correctAnswer) {
			correctCount++;
		}
	}

	const wrongCount = questions.length - correctCount;
	const score = Math.round((correctCount / questions.length) * 100);

	return {
		totalQuestions: questions.length,
		correctAnswers: correctCount,
		wrongAnswers: wrongCount,
		score,
		questions,
		userAnswers,
	};
}
