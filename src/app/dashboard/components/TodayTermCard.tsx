"use client";
import React from "react";
import { CalendarIcon } from "@/components/icons/ic_calendar";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import { LightIcon } from "@/components/icons/ic_light";

interface TermData {
	title: string;
	date: string;
	summary: string;
	description: string;
	tags: string[];
}

const mockTermData: TermData = {
	title: "TypeScript",
	date: "2025년 11월 24일",
	summary: "자바스크립트에 타입을 추가해서 더 안전하게 코드를 작성하는 언어",
	description:
		"TypeScript는 JavaScript에 정적 타입을 추가한 프로그래밍 언어입니다. 컴파일 시점에 타입 오류를 발견할 수 있어 더 안전한 코드를 작성할 수 있습니다.",
	tags: ["프론트엔드", "언어", "타입시스템"],
};

const TodayTermCard: React.FC<{ data?: TermData }> = ({
	data = mockTermData,
}) => {
	return (
		<div className="glass fancy-outline inline-flex w-full flex-col items-start justify-start gap-3 rounded-[20px] bg-white/10 px-9 py-10">
			<div className="inline-flex items-center justify-between self-stretch">
				<div className="flex items-start justify-start gap-2.5">
					<div className="flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-violet-700 to-red-400 p-2.5">
						<div className="flex h-6 w-6 items-center justify-center gap-3 overflow-hidden px-1.5 py-[3.33px]">
							<CalendarIcon className="h-5 w-5 text-white" />
						</div>
					</div>
					<div className="inline-flex w-24 flex-col items-start justify-start">
						<div className="justify-center self-stretch font-['Pretendard'] text-base leading-6 font-normal text-gray-500">
							오늘의 단어
						</div>
						<div className="justify-center self-stretch font-['Pretendard'] text-xs leading-4 font-light text-gray-300">
							{data.date}
						</div>
					</div>
				</div>

				<button className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-violet-700 to-red-400 py-2 pr-5 pl-6">
					<div className="justify-center font-['Pretendard'] text-xs leading-5 font-bold text-white">
						자세히 알아보기
					</div>
					<div className="relative h-4 w-4 overflow-hidden">
						<ArrowRightIcon className="absolute top-[2.81px] left-[2.88px] h-2.5 w-2.5 text-white" />
					</div>
				</button>
			</div>

			<div className="justify-center self-stretch font-['Pretendard'] text-3xl leading-[48px] font-bold text-white">
				{data.title}
			</div>

			<div className="inline-flex items-center justify-start gap-3 self-stretch">
				{data.tags.map((tag, index) => (
					<Tag key={tag} name={tag} isPrimary={index === 0} />
				))}
			</div>

			<div className="inline-flex h-20 flex-col items-start justify-start gap-1 self-stretch rounded-xl bg-black/60 bg-gradient-to-r from-violet-700 to-red-400 px-5 py-3.5">
				<div className="justify-center font-['Pretendard'] text-xs leading-4 font-light text-gray-500">
					쉬운 한줄 정리
				</div>
				<div className="inline-flex items-center justify-start gap-3">
					<div className="relative h-5 w-5 overflow-hidden">
						<LightIcon className="text-primary-300 absolute top-[1.50px] left-[3px] h-4 w-3.5" />
					</div>
					<div className="justify-center font-['Pretendard'] text-base leading-6 font-normal text-gray-50">
						{data.summary}
					</div>
				</div>
			</div>

			<div className="w-[597px] justify-center font-['Pretendard'] text-sm leading-5 font-normal text-gray-300">
				{data.description}
			</div>
		</div>
	);
};

const Tag: React.FC<{ name: string; isPrimary: boolean }> = ({
	name,
	isPrimary,
}) => {
	const bgColor = isPrimary ? "bg-cyan-400/50" : "bg-gray-900";
	return (
		<div
			data-variant="tag"
			className={`px-2 py-0.5 ${bgColor} inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[100px]`}
		>
			<div className="justify-center font-['Pretendard'] text-[10px] leading-4 font-light text-gray-300">
				#{name}
			</div>
		</div>
	);
};

export default TodayTermCard;
