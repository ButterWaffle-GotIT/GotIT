"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import { RotatingWords } from "./RotatingWords";
import { MarqueeText } from "./MarqueeText";

const words = [
	"API",
	"SDK",
	"CI/CD",
	"Docker",
	"Kubernetes",
	"GraphQL",
	"REST",
	"OAuth",
];

export function HeroSection() {
	const router = useRouter();

	return (
		<section className="relative flex h-screen snap-start snap-always flex-col justify-between pt-0">
			{/* Main Content */}
			<div className="flex flex-1 flex-col justify-center px-12 md:px-24 lg:px-60">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					{/* Overline */}
					<p className="mb-6 text-sm tracking-[0.2em] text-gray-500 uppercase">
						IT Dictionary for Everyone
					</p>

					{/* Main Headline */}
					<h1 className="max-w-4xl text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-light tracking-tight text-white">
						누구나 쉽게 이해하는
						<br />
						<span className="font-medium text-gray-400">IT 용어 사전</span>
					</h1>
				</motion.div>

				{/* Animated Words */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.3 }}
					className="mt-16"
				>
					<RotatingWords words={words} />
				</motion.div>
			</div>

			{/* Bottom Section */}
			<div className="px-12 pb-8 md:px-24 lg:px-60">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="mb-12 flex items-end justify-between"
				>
					<p className="max-w-md text-sm leading-relaxed text-gray-500">
						비전공자부터 이제 막 실무를 접한 주니어까지,
						<br />
						낯선 IT 용어를 쉬운 예시로 풀이해 드립니다.
					</p>

					<button
						onClick={() => router.push("/search")}
						className="group flex items-center gap-3 text-white transition-colors hover:text-gray-400"
					>
						<span className="text-sm tracking-wide">시작하기</span>
						<div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 transition-all group-hover:border-gray-500 group-hover:bg-white/5">
							<ArrowRightIcon size={20} color="currentColor" />
						</div>
					</button>
				</motion.div>

				{/* Marquee */}
				<div className="-mx-12 border-t border-gray-800 px-12 pt-6 md:-mx-24 md:px-24 lg:-mx-60 lg:px-60">
					<MarqueeText />
				</div>
			</div>
		</section>
	);
}
