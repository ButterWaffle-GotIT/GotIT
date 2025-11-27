"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { SearchIcon, ArrowRightIcon, LogoText } from "@/components/icons";

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

export default function HomePage() {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll();
	const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

	return (
		<div ref={containerRef} className="relative">
			{/* Hero */}
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
				<motion.div
					style={{ opacity }}
					className="flex items-end justify-between"
				>
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

			{/* Marquee Section */}
			<section className="overflow-hidden border-y border-gray-800 py-6">
				<MarqueeText />
			</section>

			{/* Value Prop */}
			<section className="px-6 py-32 md:px-12 lg:px-24">
				<div className="mx-auto max-w-6xl">
					<div className="grid gap-16 md:grid-cols-2 md:gap-24">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className="text-sm tracking-[0.2em] text-gray-500 uppercase"
							>
								Why GotIT
							</motion.p>
						</div>
						<div className="space-y-8">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="text-2xl leading-relaxed font-light text-white md:text-3xl"
							>
								회의 중 모르는 용어가 나와도
								<br />
								고개만 끄덕였던 적 있나요?
							</motion.p>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="text-lg leading-relaxed text-gray-500"
							>
								GotIT은 복잡한 IT 용어를 누구나 이해할 수 있는 말로
								풀어드립니다. 실제 업무에서 쓰이는 예시와 함께요.
							</motion.p>
						</div>
					</div>
				</div>
			</section>

			{/* Features - Minimal */}
			<section className="border-t border-gray-800 px-6 py-32 md:px-12 lg:px-24">
				<div className="mx-auto max-w-6xl">
					<div className="grid gap-px overflow-hidden rounded-2xl bg-gray-800 md:grid-cols-3">
						{[
							{ num: "01", title: "한 줄 요약", desc: "핵심만 빠르게" },
							{ num: "02", title: "실제 대화", desc: "현장의 뉘앙스까지" },
							{ num: "03", title: "연관 용어", desc: "맥락을 이해하며" },
						].map((item, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="group bg-gray-950 p-10 transition-colors hover:bg-gray-900"
							>
								<span className="text-xs text-gray-600">{item.num}</span>
								<h3 className="mt-4 text-xl text-white">{item.title}</h3>
								<p className="mt-2 text-sm text-gray-500">{item.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="px-6 py-32 md:px-12 lg:px-24">
				<div className="mx-auto max-w-6xl">
					<div className="flex flex-wrap justify-center gap-16 md:gap-24">
						{[
							{ value: "220+", label: "용어" },
							{ value: "9", label: "카테고리" },
						].map((stat, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="text-center"
							>
								<div className="text-5xl font-light tracking-tight text-white md:text-6xl">
									{stat.value}
								</div>
								<div className="mt-2 text-sm text-gray-500">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="px-6 py-32 md:px-12 lg:px-24">
				<div className="mx-auto max-w-4xl text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-3xl font-light text-white md:text-5xl"
					>
						지금 바로 검색해보세요
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="mt-10"
					>
						<button
							onClick={() => router.push("/search")}
							className="group inline-flex items-center gap-4 rounded-full border border-gray-700 bg-white/5 px-8 py-4 text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
						>
							<SearchIcon size={20} color="currentColor" />
							<span>용어 검색</span>
							<ArrowRightIcon
								size={16}
								color="currentColor"
								className="transition-transform group-hover:translate-x-1"
							/>
						</button>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-800 px-6 py-12 md:px-12 lg:px-24">
				<div className="mx-auto flex max-w-6xl items-center justify-between">
					<LogoText width={89} height={30} />
					<p className="text-xs text-gray-600">© 2025</p>
				</div>
			</footer>
		</div>
	);
}

// Rotating Words Component
function RotatingWords({ words }: { words: string[] }) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [words.length]);

	return (
		<div className="flex items-center gap-4">
			<span className="text-sm text-gray-600">예를 들면</span>
			<div className="relative h-8 w-32 overflow-hidden">
				<motion.div
					key={index}
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -30, opacity: 0 }}
					transition={{ duration: 0.4 }}
					className="absolute inset-0 flex items-center"
				>
					<span className="font-mono text-lg text-purple-400">
						{words[index]}
					</span>
				</motion.div>
			</div>
			<span className="text-sm text-gray-600">같은 것들</span>
		</div>
	);
}

// Marquee Component
function MarqueeText() {
	const items = [
		"Frontend",
		"Backend",
		"DevOps",
		"Cloud",
		"AI/ML",
		"Data",
		"Security",
		"UI/UX",
		"Mobile",
	];

	return (
		<div className="animate-marquee flex gap-8">
			{[...items, ...items].map((item, i) => (
				<span
					key={i}
					className="text-sm tracking-widest whitespace-nowrap text-gray-600 uppercase"
				>
					{item}
				</span>
			))}
		</div>
	);
}
