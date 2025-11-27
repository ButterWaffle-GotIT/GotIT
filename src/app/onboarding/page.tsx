"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "./components/onboardingHeader";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import CategoryList from "./components/categoryList";
import { type CategoryType } from "@/components/ui/category/config";

const Page = () => {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
		null
	);

	const handleToggleCategory = (category: CategoryType) => {
		setSelectedCategory((prev) => (prev === category ? null : category));
	};

	const handleSkip = () => {
		router.push("/");
	};

	const handleStart = () => {
		router.push("/");
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<OnboardingHeader />

			<button
				onClick={handleSkip}
				className="text-button-medium mt-10 mb-10 flex cursor-pointer items-center justify-center gap-2 text-gray-500"
			>
				<p>건너뛰기</p>
				<ArrowRightIcon className="h-4 w-4 text-gray-500" />
			</button>

			<div className="mt-10 mb-10">
				<CategoryList
					selectedCategory={selectedCategory}
					onToggleCategory={handleToggleCategory}
				/>
			</div>

			<button
				onClick={handleStart}
				className="text-button-medium mt-20 flex cursor-pointer items-center gap-2 rounded-lg py-2 pr-5 pl-6 text-white"
				style={{
					background: "linear-gradient(90deg, #6E50C8 0.02%, #CE5E61 99.98%)",
				}}
			>
				<p>시작하기</p>
				<ArrowRightIcon className="h-4 w-4 text-white" />
			</button>
		</div>
	);
};

export default Page;
