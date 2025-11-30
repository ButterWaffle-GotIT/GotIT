"use client";

import { useRouter } from "next/navigation";
import { useScrapToggle } from "@/hooks/useScrapToggle";
import type { TermIndexItem } from "@/lib/terms";

interface SearchResultCardProps {
	item: TermIndexItem;
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
	const router = useRouter();
	const { bookmarked, handleToggle } = useScrapToggle(item.id);

	const handleBookmark = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleToggle();
	};

	const handleShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const url = `${window.location.origin}/terms/${item.slug}`;
		try {
			await navigator.share({
				title: item.termEn || item.termKo,
				text: item.summary,
				url: url,
			});
		} catch {
			await navigator.clipboard.writeText(url);
		}
	};

	const handleClick = () => {
		router.push(`/terms/${item.slug}`);
	};

	return (
		<div
			onClick={handleClick}
			className="flex cursor-pointer flex-col gap-4 rounded-xl bg-gray-800/50 p-5 transition-colors hover:bg-gray-800/70"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400">
						<span className="text-lg font-bold text-gray-900">
							{item.termEn?.[0] || item.termKo[0]}
						</span>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="font-['Pretendard'] text-lg font-bold text-white">
							{item.termEn || item.termKo}
						</h3>
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<span>{item.primaryTag}</span>
							{item.termEn && <span>|</span>}
							{item.termEn && <span>{item.termKo}</span>}
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={handleBookmark}
						className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-700"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 2.5C4.30964 2.5 3.75 3.05964 3.75 3.75V17.5L10 13.75L16.25 17.5V3.75C16.25 3.05964 15.6904 2.5 15 2.5H5Z"
								fill={bookmarked ? "currentColor" : "none"}
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						onClick={handleShare}
						className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-700"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.75 6.875C15.1307 6.875 16.25 5.75571 16.25 4.375C16.25 2.99429 15.1307 1.875 13.75 1.875C12.3693 1.875 11.25 2.99429 11.25 4.375C11.25 5.75571 12.3693 6.875 13.75 6.875Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6.25 12.5C7.63071 12.5 8.75 11.3807 8.75 10C8.75 8.61929 7.63071 7.5 6.25 7.5C4.86929 7.5 3.75 8.61929 3.75 10C3.75 11.3807 4.86929 12.5 6.25 12.5Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M13.75 18.125C15.1307 18.125 16.25 17.0057 16.25 15.625C16.25 14.2443 15.1307 13.125 13.75 13.125C12.3693 13.125 11.25 14.2443 11.25 15.625C11.25 17.0057 12.3693 18.125 13.75 18.125Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.4375 11.125L11.5625 13.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11.5625 6.5L8.4375 8.875"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{item.tags?.slice(0, 3).map((tag, index) => (
					<span
						key={index}
						className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400"
					>
						# {tag}
					</span>
				))}
			</div>

			<p className="line-clamp-2 text-sm text-gray-400">{item.summary}</p>
		</div>
	);
}
