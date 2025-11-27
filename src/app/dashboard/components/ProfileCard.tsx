'use client';
import React from 'react';
import { UserIcon } from "@/components/icons/ic_user";
import { EditIcon } from "@/components/icons/ic_edit";
import { categoryIcons, categoryColors } from "@/types/category";

interface SimpleProfileCardProps {
    email: string;
    tags: string[];
}

const SimpleProfileCard: React.FC<SimpleProfileCardProps> = ({ email, tags }) => {
    return (

        <div className="h-full px-20 py-10 rounded-[20px] inline-flex justify-start items-center gap-2.5
                       glass bg-white/10 outline-[0.25px] outline-offset-[-0.25px] outline-white-30">

            <div className="w-40 inline-flex flex-col justify-start items-center gap-3">

                <div className="w-24 h-24 px-6 py-6 bg-neutral-400 rounded-full inline-flex justify-center items-center gap-2.5 overflow-hidden">
                    <UserIcon className="w-16 h-16 text-white" />
                </div>

                <div className="self-stretch justify-center text-gray-300 text-base font-normal font-['Pretendard'] leading-6">
                    {email}
                </div>

                <div className="inline-flex justify-start items-center gap-1">
                    <div className="justify-center text-gray-500 text-xs font-normal font-['Pretendard'] uppercase leading-5">관심 분야</div>
                    <div className="w-4 h-4 p-px flex justify-center items-center gap-2.5 overflow-hidden">
                        <EditIcon className="w-16 h-16 text-gray-500" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {tags.map((tag) => {
                        const IconComponent = categoryIcons[tag as keyof typeof categoryIcons];
                        const colorClass = categoryColors[tag as keyof typeof categoryColors];

                        return (
                            <div
                                key={tag}
                                className={`glass inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 outline-[0.25px] outline-offset-[-0.25px] bg-white/5 outline-white-30 shrink-0`}
                            >
                                <div
                                    className={`w-6 p-1 ${colorClass} flex items-center justify-start gap-2.5 overflow-hidden rounded-[100px] outline-[0.25px] outline-offset-[-0.25px] outline-white`}
                                >
                                    {IconComponent && (
                                        <IconComponent
                                            className="h-4 w-4 text-white"
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </div>
                                <span className="text-sm leading-6 font-bold text-white">
                                    #{tag}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default SimpleProfileCard;
