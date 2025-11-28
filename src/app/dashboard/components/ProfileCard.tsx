"use client";
import React from "react";
import { UserIcon } from "@/components/icons/ic_user";
import { EditIcon } from "@/components/icons/ic_edit";
import { categoryIcons, categoryColors } from "@/types/category";

interface SimpleProfileCardProps {
	email: string;
	tags: string[];
}

const SimpleProfileCard: React.FC<SimpleProfileCardProps> = ({
	email,
	tags,
}) => {
	return (
		<div className="glass outline-white-30 inline-flex h-full items-center justify-start gap-2.5 rounded-[20px] bg-white/10 px-20 py-10 outline-[0.25px] outline-offset-[-0.25px]">
			<div className="inline-flex w-40 flex-col items-center justify-start gap-3">
				<div className="inline-flex h-24 w-24 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-neutral-400 px-6 py-6">
					<UserIcon className="h-16 w-16 text-white" />
				</div>

				<div className="justify-center self-stretch font-['Pretendard'] text-base leading-6 font-normal text-gray-300">
					{email}
				</div>

				<div className="inline-flex items-center justify-start gap-1">
					<div className="justify-center font-['Pretendard'] text-xs leading-5 font-normal text-gray-500 uppercase">
						관심 분야
					</div>
					<div className="flex h-4 w-4 items-center justify-center gap-2.5 overflow-hidden p-px">
						<EditIcon className="h-16 w-16 text-gray-500" />
					</div>
				</div>

				<div className="flex flex-wrap justify-center gap-2">
					{tags.map((tag) => {
						const IconComponent =
							categoryIcons[tag as keyof typeof categoryIcons];
						const colorClass =
							categoryColors[tag as keyof typeof categoryColors] ||
							"bg-gray-400";

						return (
							<div
								key={tag}
								className={`glass outline-white-30 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/5 px-5 py-2 outline-[0.25px] outline-offset-[-0.25px]`}
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
