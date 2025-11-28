"use client";

import React, { useState } from "react";
import ProfileCard from "@/app/dashboard/components/ProfileCard";
import TodayTermCard from "@/app/dashboard/components/TodayTermCard";
import ScrapSection from "@/app/dashboard/components/ScrapSection";

const mockCards = [
	{
		id: "1",
		category: "프론트엔드",
		term: "React Hooks",
		tag: "라이브러리",
		description:
			"React 16.8에서 도입된 기능으로, 클래스 컴포넌트 없이 state와 다른 React 기능들을 사용할 수 있게 해줍니다.",
		date: "2024.11.27",
	},
	{
		id: "2",
		category: "백엔드",
		term: "RESTful API",
		tag: "아키텍처",
		description:
			"HTTP 프로토콜을 기반으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법론입니다.",
		date: "2024.11.26",
	},
	{
		id: "3",
		category: "DevOps",
		term: "Docker",
		tag: "컨테이너",
		description:
			"애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼입니다.",
		date: "2024.11.25",
	},
	{
		id: "4",
		category: "프론트엔드",
		term: "React Hooks",
		tag: "라이브러리",
		description:
			"React 16.8에서 도입된 기능으로, 클래스 컴포넌트 없이 state와 다른 React 기능들을 사용할 수 있게 해줍니다.",
		date: "2024.11.27",
	},
	{
		id: "5",
		category: "백엔드",
		term: "RESTful API",
		tag: "아키텍처",
		description:
			"HTTP 프로토콜을 기반으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법론입니다.",
		date: "2024.11.26",
	},
	{
		id: "6",
		category: "DevOps",
		term: "Docker",
		tag: "컨테이너",
		description:
			"애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼입니다.",
		date: "2024.11.25",
	},
];

const userData = {
	email: "nickname@gmail.com",
	tags: ["프론트엔드"],
};

export default function DashboardPage() {
	const [selectedCategory, setSelectedCategory] = useState("전체");

	const filteredCards =
		selectedCategory === "전체"
			? mockCards
			: mockCards.filter((card) => card.category === selectedCategory);

	return (
		<div className="flex w-[1040px] flex-col items-start justify-start gap-10 pt-20 pb-20">
			<div className="inline-flex items-stretch justify-start gap-5 self-stretch">
				<div className="w-80 flex-shrink-0">
					<ProfileCard email={userData.email} tags={userData.tags} />
				</div>

				<div className="flex-1">
					<TodayTermCard />
				</div>
			</div>

			<div className="self-stretch">
				<ScrapSection
					totalCount={filteredCards.length}
					selectedCategory={selectedCategory}
					onCategorySelect={setSelectedCategory}
					cards={filteredCards}
				/>
			</div>
		</div>
	);
}
