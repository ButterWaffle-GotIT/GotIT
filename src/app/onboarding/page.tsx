"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "./components/onboardingHeader";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import CategoryList from "./components/categoryList";
import { type CategoryType } from "@/config/categories";
import { useAuthCore, useUserData } from "@/contexts/auth";

const Page = () => {
	const router = useRouter();
	const { user } = useAuthCore();
	const { completeOnboarding } = useUserData();
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleSelectCategory = (category: CategoryType) => {
		setSelectedCategory((prev) => (prev === category ? null : category));
	};

	const handleSkip = async () => {
		if (!user) {
			router.push("/");
			return;
		}
		setIsLoading(true);
		try {
			await completeOnboarding("all");
			router.push("/");
		} catch (error) {
			console.error("온보딩 완료 실패:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleStart = async () => {
		if (!user) {
			router.push("/");
			return;
		}
		if (!selectedCategory) {
			return;
		}
		setIsLoading(true);
		try {
			await completeOnboarding(selectedCategory);
			router.push("/");
		} catch (error) {
			console.error("온보딩 완료 실패:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<OnboardingHeader />

			<button
				onClick={handleSkip}
				disabled={isLoading}
				className="text-button-medium mt-10 mb-10 flex cursor-pointer items-center justify-center gap-2 text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<p>건너뛰기</p>
				<ArrowRightIcon className="h-4 w-4 text-gray-500" />
			</button>

			<div className="mt-10 mb-10">
				<CategoryList
					selectedCategory={selectedCategory}
					onSelectCategory={handleSelectCategory}
				/>
			</div>

			<button
				onClick={handleStart}
				disabled={isLoading}
				className="text-button-medium mt-20 flex cursor-pointer items-center gap-2 rounded-lg py-2 pr-5 pl-6 text-white disabled:cursor-not-allowed disabled:opacity-50"
				style={{
					background: "linear-gradient(90deg, #6E50C8 0.02%, #CE5E61 99.98%)",
				}}
			>
				<p>{isLoading ? "저장 중..." : "시작하기"}</p>
				<ArrowRightIcon className="h-4 w-4 text-white" />
			</button>
		</div>
	);
};

export default Page;
