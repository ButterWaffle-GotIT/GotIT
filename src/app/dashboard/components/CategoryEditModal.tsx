"use client";

import React, { useState, useEffect } from "react";
import {
	type CategoryType,
	categoryConfig,
	categoryLabels,
} from "@/components/ui/category/config";

interface CategoryEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentCategory: CategoryType;
	onSave: (category: CategoryType) => Promise<void>;
}

const selectableCategories: CategoryType[] = [
	"all",
	"frontend",
	"backend",
	"uxui",
	"ai",
	"cloud",
	"data",
	"security",
	"devops",
	"business",
];

export default function CategoryEditModal({
	isOpen,
	onClose,
	currentCategory,
	onSave,
}: CategoryEditModalProps) {
	const [selectedCategory, setSelectedCategory] =
		useState<CategoryType>(currentCategory);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setSelectedCategory(currentCategory);
		}
	}, [isOpen, currentCategory]);

	const handleSelectCategory = (category: CategoryType) => {
		setSelectedCategory(category);
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await onSave(selectedCategory);
			onClose();
		} catch (error) {
			console.error("카테고리 저장 실패:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="glass relative z-10 w-[480px] rounded-2xl bg-gray-900/90 p-8">
				<h2 className="mb-6 text-center text-xl font-bold text-white">
					관심 분야 수정
				</h2>

				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{selectableCategories.map((category) => {
						const config = categoryConfig[category];
						const IconComponent = config.icon;
						const isSelected = selectedCategory === category;

						return (
							<button
								key={category}
								onClick={() => handleSelectCategory(category)}
								className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all ${
									isSelected
										? "bg-white/20 ring-2 ring-white/50"
										: "bg-white/5 hover:bg-white/10"
								}`}
							>
								<div
									className={`flex h-6 w-6 items-center justify-center rounded-full ${config.bgColor}`}
								>
									<IconComponent className="h-4 w-4 text-white" />
								</div>
								<span className="text-sm text-white">
									{categoryLabels[category]}
								</span>
							</button>
						);
					})}
				</div>

				<div className="flex justify-center gap-4">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="rounded-lg bg-gray-700 px-6 py-2 text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
					>
						취소
					</button>
					<button
						onClick={handleSave}
						disabled={isLoading}
						className="rounded-lg px-6 py-2 text-white transition-colors disabled:opacity-50"
						style={{
							background:
								"linear-gradient(90deg, #6E50C8 0.02%, #CE5E61 99.98%)",
						}}
					>
						{isLoading ? "저장 중..." : "저장"}
					</button>
				</div>
			</div>
		</div>
	);
}
