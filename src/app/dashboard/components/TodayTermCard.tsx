'use client';
import React from 'react';
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
	title: 'TypeScript',
	date: '2025년 11월 24일',
	summary: '자바스크립트에 타입을 추가해서 더 안전하게 코드를 작성하는 언어',
	description: 'TypeScript는 JavaScript에 정적 타입을 추가한 프로그래밍 언어입니다. 컴파일 시점에 타입 오류를 발견할 수 있어 더 안전한 코드를 작성할 수 있습니다.',
	tags: ['프론트엔드', '언어', '타입시스템'],
};

const TodayTermCard: React.FC<{ data?: TermData }> = ({ data = mockTermData }) => {
	return (
		<div className="w-full px-9 py-10 bg-white/10 rounded-[20px] inline-flex flex-col justify-start items-start gap-3 glass fancy-outline">
			<div className="self-stretch inline-flex justify-between items-center">
				<div className="flex justify-start items-start gap-2.5">
					<div className="p-2.5 bg-gradient-to-r from-violet-700 to-red-400 rounded-lg flex justify-center items-center overflow-hidden">
						<div className="w-6 h-6 px-1.5 py-[3.33px] flex justify-center items-center gap-3 overflow-hidden">
							<CalendarIcon className="w-5 h-5 text-white" />
						</div>
					</div>
					<div className="w-24 inline-flex flex-col justify-start items-start">
						<div className="self-stretch justify-center text-gray-500 text-base font-normal font-['Pretendard'] leading-6 ">
							오늘의 단어
						</div>
						<div className="self-stretch justify-center text-gray-300 text-xs font-light font-['Pretendard'] leading-4 ">
							{data.date}
						</div>
					</div>
				</div>

				<button
					className="pl-6 pr-5 py-2 bg-gradient-to-r from-violet-700 to-red-400 rounded-lg inline-flex justify-center items-center gap-2 overflow-hidden"
				>
					<div className="justify-center text-white text-xs font-bold font-['Pretendard'] leading-5">
						자세히 알아보기
					</div>
					<div className="w-4 h-4 relative overflow-hidden">
						<ArrowRightIcon className="w-2.5 h-2.5 left-[2.88px] top-[2.81px] absolute text-white" />
					</div>
				</button>
			</div>

			<div className="self-stretch justify-center text-white text-3xl font-bold font-['Pretendard'] leading-[48px]">
				{data.title}
			</div>

			<div className="self-stretch inline-flex justify-start items-center gap-3">
				{data.tags.map((tag, index) => (
					<Tag key={index} name={tag} isPrimary={index === 0} />
				))}
			</div>

			<div className="self-stretch h-20 px-5 py-3.5 bg-black/60 bg-gradient-to-r from-violet-700 to-red-400 rounded-xl inline-flex flex-col justify-start items-start gap-1">
				<div className="justify-center text-gray-500 text-xs font-light font-['Pretendard'] leading-4">
					쉬운 한줄 정리
				</div>
				<div className="inline-flex justify-start items-center gap-3">
					<div className="w-5 h-5 relative overflow-hidden">
						<LightIcon className="w-3.5 h-4 left-[3px] top-[1.50px] absolute text-primary-300" />
					</div>
					<div className="justify-center text-gray-50 text-base font-normal font-['Pretendard'] leading-6">
						{data.summary}
					</div>
				</div>
			</div>

			<div className="w-[597px] justify-center text-gray-300 text-sm font-normal font-['Pretendard'] leading-5">
				{data.description}
			</div>
		</div>
	);
};

const Tag: React.FC<{ name: string; isPrimary: boolean }> = ({ name, isPrimary }) => {
	const bgColor = isPrimary ? 'bg-cyan-400/50' : 'bg-gray-900';
	return (
		<div
			data-variant="tag"
			className={`px-2 py-0.5 ${bgColor} rounded-[100px] inline-flex justify-center items-center gap-2.5 overflow-hidden`}
		>
			<div className="justify-center text-gray-300 text-[10px] font-light font-['Pretendard'] leading-4">
				#{name}
			</div>
		</div>
	);
};

export default TodayTermCard;
