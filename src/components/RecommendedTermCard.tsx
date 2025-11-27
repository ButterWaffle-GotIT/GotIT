import React, { ElementType } from 'react';

// 1. 카테고리 아이콘 컴포넌트 임포트 (TagList.tsx와 동일한 Named Export 가정)
import { CategoryAllIcon } from '@/components/icons/ic_category_all';
import { CategoryFrontendIcon } from '@/components/icons/ic_category_frontend';
import { CategoryBackendIcon } from '@/components/icons/ic_category_backend';
import { CategoryUiuxIcon } from '@/components/icons/ic_category_uiux';
import { CategoryAiIcon } from '@/components/icons/ic_category_ai';
import { CategoryCloudIcon } from '@/components/icons/ic_category_cloud';
import { CategoryDataIcon } from '@/components/icons/ic_category_data';
import { CategorySecurityIcon } from '@/components/icons/ic_category_security';
import { CategoryDevopsIcon } from '@/components/icons/ic_category_devops';
import { CategoryBusinessIcon } from '@/components/icons/ic_category_business';

interface TermCardProps {
    term: string;
    category: string;
    description: string;
    iconColor: string;
}

// 2. 카테고리 이름과 아이콘 컴포넌트를 매핑
const CategoryIconMap: { [key: string]: ElementType } = {
    '전체': CategoryAllIcon,
    '프론트엔드': CategoryFrontendIcon,
    '백엔드': CategoryBackendIcon,
    'UI/UX': CategoryUiuxIcon,
    'AI': CategoryAiIcon,
    '클라우드': CategoryCloudIcon,
    '데이터': CategoryDataIcon,
    '보안/네트워크': CategorySecurityIcon,
    'DevOps': CategoryDevopsIcon,
    'IT비즈니스': CategoryBusinessIcon,
};


export default function RecommendedTermCard({ term, category, description, iconColor }: TermCardProps) {

    // 3. 현재 카테고리에 맞는 아이콘 컴포넌트를 찾습니다.
    const IconComponent = CategoryIconMap[category] || CategoryAllIcon;

    return (
        // Figma: w-64 p-5 rounded-xl outline outline-[0.25px] outline-offset-[-0.25px] outline-white
        <div className="w-64 p-5 rounded-xl outline outline-[0.25px] outline-white/25 flex flex-col justify-start items-start gap-2.5 overflow-hidden bg-black/50 hover:bg-black/70 transition-colors cursor-pointer">
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-center gap-1">
                    <div className="flex-1 flex justify-start items-center gap-2">
                        {/* 카테고리 아이콘 컨테이너 */}
                        <div className={`w-6 p-1 ${iconColor} rounded-full outline outline-[0.25px] outline-white flex justify-center items-center overflow-hidden`}>
                            <IconComponent
                                width={16}
                                height={16}
                                className="w-4 h-4 text-white"
                            />
                        </div>
                        {/* 용어 제목 */}
                        <div className="flex-1 justify-center text-gray-50 text-base font-semibold font-['Pretendard'] leading-6">
                            {term}
                        </div>
                    </div>
                    {/* 작은 태그 */}
                    <div className="px-2 py-0.5 bg-gray-900 rounded-full flex justify-center items-center overflow-hidden">
                        <div className="justify-center text-gray-300 text-[10px] font-light font-['Pretendard'] leading-4">#{category}</div>
                    </div>
                </div>
                {/* 용어 설명 */}
                <div className="self-stretch justify-center text-gray-400 text-xs font-light font-['Pretendard'] leading-4">
                    {description}
                </div>
            </div>
        </div>
    );
}
