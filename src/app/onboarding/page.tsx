"use client";

import React, { useState } from 'react'
import OnboardingHeader from './components/onboardingHeader'
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import CategoryList from './components/categoryList';
import { type CategoryType } from "@/components/ui/category/config";

const Page = () => {
	const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);

	const handleToggleCategory = (category: CategoryType) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<OnboardingHeader/>



			<button className='flex justify-center items-center gap-2 mt-10 mb-10 text-gray-500 text-button-medium cursor-pointer'>
				<p>건너뛰기</p>
				<ArrowRightIcon className="h-4 w-4 text-gray-500"/>
			</button>

			<div className="mt-10 mb-10">
				<CategoryList
					selectedCategories={selectedCategories}
					onToggleCategory={handleToggleCategory}
				/>
			</div>
			<button
				className='mt-20 flex items-center gap-2 rounded-lg py-2 pl-6 pr-5 text-white text-button-medium'
				style={{
					background: 'linear-gradient(90deg, #6E50C8 0.02%, #CE5E61 99.98%)'
				}}
			>
				<p>시작하기</p>
				<ArrowRightIcon className="h-4 w-4 text-white"/>
			</button>

		</div>
	)
}

export default Page
