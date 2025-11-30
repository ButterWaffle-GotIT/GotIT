"use client";

import { useState } from "react";
import { type CategoryType } from "@/components/ui/category/config";
import CategoryButton from "@/app/onboarding/components/categoruButton";
import { generateQuizQuestions, type QuizQuestion } from "@/lib/quiz";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import { useToast } from "@/contexts/ToastContext";
import GradientButton from "@/components/ui/buttons/GradientButton";

interface CategorySelectionProps {
	onCategorySelect: (category: CategoryType, questions: QuizQuestion[]) => void;
}

const row1Categories: CategoryType[] = [
	"all",
	"frontend",
	"backend",
	"uxui",
	"ai",
];
const row2Categories: CategoryType[] = [
	"cloud",
	"data",
	"security",
	"devops",
	"business",
];

export default function CategorySelection({
	onCategorySelect,
}: CategorySelectionProps) {
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
		null
	);
	const [questionCount, setQuestionCount] = useState<number>(10);
	const [isLoading, setIsLoading] = useState(false);
	const { showToast } = useToast();

	const handleSelectCategory = (category: CategoryType) => {
		setSelectedCategory(category);
	};

	const handleStartQuiz = async () => {
		if (!selectedCategory) {
			showToast("카테고리를 선택해주세요!", "error");
			return;
		}

		setIsLoading(true);

		try {
			const questions = await generateQuizQuestions(
				selectedCategory,
				questionCount
			);
			onCategorySelect(selectedCategory, questions);
		} catch (err) {
			showToast(
				err instanceof Error ? err.message : "퀴즈 생성에 실패했습니다.",
				"error"
			);
			setIsLoading(false);
		}
	};

	return (
		<div className="flex w-full flex-col items-center gap-12">
			{/* 헤더 */}
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-4xl font-bold text-white">IT 용어 퀴즈</h1>
				<p className="text-xl text-gray-500">
					카테고리를 선택하고 퀴즈를 시작하세요!
				</p>
			</div>

			{/* 카테고리 선택 */}
			<div className="flex w-full flex-col items-center gap-6">
				<h2 className="text-lg text-gray-700">카테고리 선택</h2>
				<div className="flex flex-col gap-10">
					{/* 첫 번째 줄 */}
					<div className="flex justify-center gap-10">
						{row1Categories.map((category) => (
							<CategoryButton
								key={category}
								category={category}
								isSelected={selectedCategory === category}
								onClick={() => handleSelectCategory(category)}
							/>
						))}
					</div>

					{/* 두 번째 줄 */}
					<div className="flex justify-center gap-10">
						{row2Categories.map((category) => (
							<CategoryButton
								key={category}
								category={category}
								isSelected={selectedCategory === category}
								onClick={() => handleSelectCategory(category)}
							/>
						))}
					</div>
				</div>
			</div>

			{/* 문제 수 선택 */}
			<div className="flex flex-col items-center gap-6">
				<h2 className="text-xl font-bold text-white">문제 수</h2>
				<div className="flex gap-6">
					{[5, 10, 15, 20].map((count) => (
						<button
							key={count}
							onClick={() => setQuestionCount(count)}
							className={`relative pb-2 text-lg font-semibold transition-all ${
								questionCount === count
									? "text-white"
									: "text-gray-500 hover:text-gray-300"
							}`}
						>
							{count}문제
							{questionCount === count && (
								<div className="absolute right-0 bottom-0 left-0 h-0.5 bg-linear-to-r from-violet-700 to-red-400" />
							)}
						</button>
					))}
				</div>
			</div>

			{/* 시작 버튼 */}
			<GradientButton
				onClick={handleStartQuiz}
				disabled={isLoading}
				rounded="full"
				className="group inline-flex items-center gap-4"
			>
				<span className="font-bold">
					{isLoading ? "퀴즈 생성 중..." : "퀴즈 시작하기"}
				</span>
				{!isLoading && (
					<ArrowRightIcon
						size={16}
						color="currentColor"
						className="transition-transform group-hover:translate-x-1"
					/>
				)}
			</GradientButton>
		</div>
	);
}
