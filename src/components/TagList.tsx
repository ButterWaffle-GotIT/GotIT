"use client";
import React from "react";
import { ElementType } from "react";

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

interface TagListProps {
	selectedTag: string;
	onTagSelect: (tagName: string) => void;
}

// 2. 아이콘 컴포넌트 타입을 위한 TagData 인터페이스 수정
interface TagData {
	name: string;
	color: string;
	IconComponent: ElementType;
}

// 태그 데이터 (최종 디자인 스펙 반영)
const tagData: TagData[] = [
	{ name: "전체", color: "bg-gray-400", IconComponent: CategoryAllIcon },
	{
		name: "프론트엔드",
		color: "bg-cyan-400",
		IconComponent: CategoryFrontendIcon,
	},
	{ name: "백엔드", color: "bg-green-600", IconComponent: CategoryBackendIcon },
	{
		name: "UX/UI디자인",
		color: "bg-rose-400",
		IconComponent: CategoryUiuxIcon,
	},
	{ name: "AI", color: "bg-violet-400", IconComponent: CategoryAiIcon },
	{ name: "클라우드", color: "bg-sky-400", IconComponent: CategoryCloudIcon },
	{ name: "데이터", color: "bg-teal-400", IconComponent: CategoryDataIcon },
	{
		name: "보안/네트워크",
		color: "bg-orange-400",
		IconComponent: CategorySecurityIcon,
	},
	{ name: "DevOps", color: "bg-amber-400", IconComponent: CategoryDevopsIcon },
	{
		name: "IT비즈니스",
		color: "bg-blue-400",
		IconComponent: CategoryBusinessIcon,
	},
];

const renderTag = (
	tag: (typeof tagData)[0],
	selectedTag: string,
	onTagSelect: (name: string) => void
) => {
	const { IconComponent } = tag;
	const isActive = selectedTag === tag.name;

	// Default 스타일 (선택되지 않았을 때의 기본 배경)
	const defaultStyle = "bg-white/5 outline-white-30";

	// Hover 스타일 (고유색 10% 투명도)
	const hoverStyle = `hover:${tag.color}/10 hover:outline-white-50`;

	// Active 스타일 (선택됨: 고유색 50% 투명도)
	const activeStyle = `${tag.color}/50 outline-white`;

	// 최종 클래스 조합
	const finalClasses = isActive
		? activeStyle + " transition-colors" // Active: 고유색 50% 강조
		: defaultStyle + " " + hoverStyle + " transition-colors"; // Default + Hover

	return (
		<div
			key={tag.name}
			onClick={() => onTagSelect(tag.name)}
			className={`glass inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 outline outline-[0.25px] outline-offset-[-0.25px] ${finalClasses} `}
		>
			{/* 아이콘 컨테이너 */}
			<div
				className={`w-6 p-1 ${tag.color} flex items-center justify-start gap-2.5 overflow-hidden rounded-[100px] outline outline-[0.25px] outline-offset-[-0.25px] outline-white`}
			>
				{/* SVG 라인 아이콘 렌더링 */}
				<IconComponent className="h-4 w-4 text-white" width={16} height={16} />
			</div>

			{/* 텍스트 */}
			<div className="flex items-center justify-start gap-0.5">
				<span className="justify-start font-['Pretendard'] text-sm leading-6 font-bold text-white">
					#
				</span>
				<span className="justify-start font-['Pretendard'] text-sm leading-6 font-bold text-white">
					{tag.name}
				</span>
			</div>
		</div>
	);
};

export default function TagList({ selectedTag, onTagSelect }: TagListProps) {
	// 데이터를 두 줄로 분할
	const row1 = tagData.slice(0, 5);
	const row2 = tagData.slice(5);

	return (
		<div className="flex flex-col items-center justify-start gap-3 self-stretch">
			{/* 첫 번째 줄 (중앙 정렬) */}
			<div className="inline-flex items-center justify-center gap-5 self-stretch">
				{row1.map((tag) => renderTag(tag, selectedTag, onTagSelect))}
			</div>

			{/* 두 번째 줄 (중앙 정렬) */}
			<div className="inline-flex items-center justify-center gap-5 self-stretch">
				{row2.map((tag) => renderTag(tag, selectedTag, onTagSelect))}
			</div>
		</div>
	);
}
