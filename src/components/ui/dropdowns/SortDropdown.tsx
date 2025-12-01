"use client";

import { useState, useRef, useEffect } from "react";
import { SortIcon } from "@/components/icons/ic_sort";
import { ChevronDownIcon } from "@/components/icons/ic_chevron_down";
import { SortType } from "@/app/dashboard/utils/order";

interface SortDropdownProps {
	sortType: SortType;
	onSortChange: (sortType: SortType) => void;
}

export default function SortDropdown({
	sortType,
	onSortChange,
}: SortDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				className="flex items-center gap-1"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<SortIcon className="h-4 w-4 text-gray-50" width={16} height={16} />
				<span className="text-button-small text-gray-50">
					{sortType === "latest" ? "최신순" : "가나다순"}
				</span>
				<ChevronDownIcon
					className="h-4 w-4 text-gray-50"
					width={16}
					height={16}
				/>
			</button>

			{isDropdownOpen && (
				<div className="absolute top-full right-0 z-50 mt-2 flex w-30 flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
					<button
						className="text-body4 px-4 py-3 text-left text-gray-50 transition-colors hover:bg-gray-800"
						onClick={() => {
							onSortChange("latest");
							setIsDropdownOpen(false);
						}}
					>
						최신순
					</button>
					<button
						className="text-body4 px-4 py-3 text-left text-gray-50 transition-colors hover:bg-gray-800"
						onClick={() => {
							onSortChange("alphabetical");
							setIsDropdownOpen(false);
						}}
					>
						가나다순
					</button>
				</div>
			)}
		</div>
	);
}
