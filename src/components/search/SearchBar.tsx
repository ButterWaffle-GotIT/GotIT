"use client";

import { SearchIcon } from "@/components/icons/ic_search";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { LogoText } from "../icons";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

const searchExamples = ["API", "React", "Docker"];

export default function SearchBar({ value, onChange }: SearchBarProps) {
	const typingText = useTypingAnimation(searchExamples, 150, 100, 1500);
	return (
		<div className="flex w-[864px] flex-col items-center justify-start gap-10">
			<LogoText width={223} height={100} />

			{/* 검색 입력창 컨테이너 */}
			<div className="relative h-20 w-full">
				{/* 1. 아우라 레이어 (opacity 30 + blur + gradient border) */}
				<div className="absolute top-0 left-0 h-20 w-[864px] rounded-[20px] border border-violet-700 bg-linear-to-r from-violet-700 to-red-400 opacity-30 blur-sm"></div>

				{/* 2. 실제 입력창 (내부) */}
				<div className="absolute top-[4px] left-[4px] inline-flex w-[856px] items-center justify-between overflow-hidden rounded-[20px] bg-black/70 px-7 py-4 outline outline-1 outline-offset-[-1px] outline-violet-700">
					<input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="flex-1 bg-transparent font-['Pretendard'] text-base leading-6 font-normal text-white placeholder-gray-500 outline-none"
						placeholder={`IT 용어 검색 (2글자 이상) : ${typingText}`}
					/>
					{/* 검색 아이콘 */}
					<div className="relative h-9 w-9 overflow-hidden">
						<SearchIcon
							className="absolute top-[6px] left-[6px] h-6 w-6 text-violet-700"
							width={24}
							height={24}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
