"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserIcon } from "@/components/icons/ic_user";
import { EditIcon } from "@/components/icons/ic_edit";
import { CATEGORIES, type CategoryType } from "@/config/categories";
import { useAuthCore, useUserData } from "@/contexts/auth";
import CategoryEditModal from "./CategoryEditModal";

const SimpleProfileCard: React.FC = () => {
	const { user } = useAuthCore();
	const { userData, updateCategory } = useUserData();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectedCategory = userData?.selectedCategory || "all";
	const email = userData?.email || user?.email || "";
	const photoURL = userData?.photoURL || user?.photoURL || "";

	const handleSaveCategory = async (category: CategoryType) => {
		await updateCategory(category);
	};

	const config = CATEGORIES[selectedCategory];
	const IconComponent = config?.icon;

	return (
		<>
			<div className="glass outline-white-30 inline-flex h-full items-center justify-start gap-2.5 rounded-[20px] bg-white/10 px-20 py-10 outline-[0.25px] outline-offset-[-0.25px]">
				<div className="inline-flex w-40 flex-col items-center justify-start gap-3">
					<div className="inline-flex h-24 w-24 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-neutral-400">
						{photoURL ? (
							<Image
								src={photoURL}
								alt="프로필"
								width={96}
								height={96}
								className="h-full w-full object-cover"
							/>
						) : (
							<UserIcon className="h-16 w-16 text-white" />
						)}
					</div>

					<div className="justify-center self-stretch text-center font-['Pretendard'] text-base leading-6 font-normal text-gray-300">
						{email}
					</div>

					<button
						onClick={() => setIsModalOpen(true)}
						className="inline-flex cursor-pointer items-center justify-start gap-1 transition-opacity hover:opacity-80"
					>
						<div className="justify-center font-['Pretendard'] text-xs leading-5 font-normal text-gray-500 uppercase">
							관심 분야
						</div>
						<div className="flex h-4 w-4 items-center justify-center gap-2.5 overflow-hidden p-px">
							<EditIcon className="h-4 w-4 text-gray-500" />
						</div>
					</button>

					<div className="flex flex-wrap justify-center gap-2">
						{config && IconComponent ? (
							<div className="glass outline-white-30 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/5 px-5 py-2 outline-[0.25px] outline-offset-[-0.25px]">
								<div
									className={`flex h-6 w-6 items-center justify-center rounded-full ${config.bgColor}`}
								>
									<IconComponent className="h-4 w-4 text-white" />
								</div>
								<span className="text-sm leading-6 font-bold text-white">
									#{config.label}
								</span>
							</div>
						) : (
							<span className="text-sm text-gray-500">
								관심 분야를 선택해주세요
							</span>
						)}
					</div>
				</div>
			</div>

			<CategoryEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				currentCategory={selectedCategory}
				onSave={handleSaveCategory}
			/>
		</>
	);
};

export default SimpleProfileCard;
