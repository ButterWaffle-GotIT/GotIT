"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import { RotatingWords } from "./RotatingWords";

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
	const { scrollYProgress } = useScroll();
	const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

	return (
		<section className="relative flex min-h-screen flex-col justify-between px-6 pt-0 pb-16 md:px-12 lg:px-24">
			{/* Main Content */}
			<div className="flex flex-1 flex-col justify-center">
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
					<h1 className="max-w-4xl text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-light tracking-tight text-white">
						개발자 말,
						<br />
						<span className="font-medium text-gray-400">이제 알아듣자.</span>
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
			<motion.div style={{ opacity }} className="flex items-end justify-between">
				<p className="max-w-xs text-sm leading-relaxed text-gray-500">
					PM, 디자이너, 마케터, 취준생까지.
					<br />
					IT 용어의 벽을 허무는 가장 쉬운 방법.
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
		</section>
	);
}
