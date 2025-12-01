"use client";

import React, { ElementType } from "react";
import { useRouter } from "next/navigation";

// 1. 카테고리 아이콘 컴포넌트 임포트 (TagList.tsx와 동일한 Named Export 가정)
import { CategoryAllIcon } from "@/components/icons/ic_category_all";
import { CategoryFrontendIcon } from "@/components/icons/ic_category_frontend";
import { CategoryBackendIcon } from "@/components/icons/ic_category_backend";
import { CategoryUiuxIcon } from "@/components/icons/ic_category_uiux";
import { CategoryAiIcon } from "@/components/icons/ic_category_ai";
import { CategoryCloudIcon } from "@/components/icons/ic_category_cloud";
import { CategoryDataIcon } from "@/components/icons/ic_category_data";
import { CategorySecurityIcon } from "@/components/icons/ic_category_security";
import { CategoryDevopsIcon } from "@/components/icons/ic_category_devops";
import { CategoryBusinessIcon } from "@/components/icons/ic_category_business";

interface TermCardProps {
	term: string;
	category: string;
	description: string;
	iconColor: string;
	slug: string;
}

// 2. 카테고리 이름과 아이콘 컴포넌트를 매핑
const CategoryIconMap: { [key: string]: ElementType } = {
	전체: CategoryAllIcon,
	프론트엔드: CategoryFrontendIcon,
	백엔드: CategoryBackendIcon,
	"UX/UI": CategoryUiuxIcon,
	AI: CategoryAiIcon,
	클라우드: CategoryCloudIcon,
	데이터: CategoryDataIcon,
	"보안/네트워크": CategorySecurityIcon,
	DevOps: CategoryDevopsIcon,
	IT비즈니스: CategoryBusinessIcon,
};

export default function RecommendedTermCard({
	term,
	category,
	description,
	iconColor,
	slug,
}: TermCardProps) {
	const router = useRouter();
	// 3. 현재 카테고리에 맞는 아이콘 컴포넌트를 찾습니다.
	const IconComponent = CategoryIconMap[category] || CategoryAllIcon;

	const handleClick = () => {
		router.push(`/terms/${slug}`);
	};

	return (
		// Figma: w-64 p-5 rounded-xl outline outline-[0.25px] outline-offset-[-0.25px] outline-white
		<div
			onClick={handleClick}
			className="flex w-64 cursor-pointer flex-col items-start justify-start gap-2.5 overflow-hidden rounded-xl bg-black/50 p-5 outline outline-[0.25px] outline-white/25 transition-colors hover:bg-black/70"
		>
			<div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
				<div className="inline-flex items-center justify-start gap-1 self-stretch">
					<div className="flex flex-1 items-center justify-start gap-2">
						{/* 카테고리 아이콘 컨테이너 */}
						<div
							className={`w-6 p-1 ${iconColor} flex items-center justify-center overflow-hidden rounded-full outline outline-[0.25px] outline-white`}
						>
							<IconComponent
								width={16}
								height={16}
								className="h-4 w-4 text-white"
							/>
						</div>
						{/* 용어 제목 */}
						<div className="flex-1 justify-center font-['Pretendard'] text-base leading-6 font-semibold text-gray-50">
							{term}
						</div>
					</div>
					{/* 작은 태그 */}
					<div className="flex items-center justify-center overflow-hidden rounded-full bg-gray-900 px-2 py-0.5">
						<div className="justify-center font-['Pretendard'] text-[10px] leading-4 font-light text-gray-300">
							#{category}
						</div>
					</div>
				</div>
				{/* 용어 설명 */}
				<div className="justify-center self-stretch font-['Pretendard'] text-xs leading-4 font-light text-gray-400">
					{description}
				</div>
			</div>
		</div>
	);
}
