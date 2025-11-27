// components/SearchBar.tsx
import React from 'react';
import { SearchIcon } from '@/components/icons/ic_search';

export default function SearchBar() {
    return (
        <div className="w-[864px] flex flex-col justify-start items-center gap-10">
            {/* 중앙 로고: got IT */}
            <h1 className="text-white text-6xl font-normal font-['Dela_Gothic_One'] leading-[60px]">
                got IT
            </h1>

            {/* 검색 입력창 컨테이너 */}
            <div className="w-full h-20 relative">
                {/* 1. 아우라 레이어 (opacity 30 + blur + gradient border) */}
                <div className="w-[864px] h-20 left-0 top-0 absolute opacity-30 bg-gradient-to-r from-violet-700 to-red-400 rounded-[20px] border border-violet-700 blur-sm"></div>

                {/* 2. 실제 입력창 (내부) */}
                <div className="w-[856px] px-7 py-4 left-[4px] top-[4px] absolute bg-black/70 rounded-[20px] outline outline-1 outline-offset-[-1px] outline-violet-700 inline-flex justify-between items-center overflow-hidden">
                    <input
                        className="flex-1 bg-transparent text-gray-500 text-base font-normal font-['Pretendard'] leading-6 placeholder-gray-500 outline-none"
                        placeholder="궁금한 IT 용어를 검색해보세요... (예: API, React, Docker)"
                    />
                    {/* 검색 아이콘 (SVG placeholder) */}
                    <div className="w-9 h-9 relative overflow-hidden">
                        <SearchIcon
                            className="w-6 h-6 left-[6px] top-[6px] absolute text-violet-700"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
