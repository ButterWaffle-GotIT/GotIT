"use client";

import { motion } from "framer-motion";

export function FeaturesSection() {
	const features = [
		{ num: "01", title: "한 줄 요약", desc: "핵심만 빠르게" },
		{ num: "02", title: "실제 대화", desc: "현장의 뉘앙스까지" },
		{ num: "03", title: "연관 용어", desc: "맥락을 이해하며" },
	];

	const stats = [
		{ value: "220+", label: "용어" },
		{ value: "9", label: "카테고리" },
	];

	return (
		<section className="flex h-screen snap-start snap-always flex-col justify-center border-t border-gray-800 px-12 py-32 md:px-24 lg:px-60">
			<div className="mx-auto w-full max-w-6xl space-y-24">
				{/* Features */}
				<div className="grid gap-px overflow-hidden rounded-2xl bg-gray-800 md:grid-cols-3">
					{features.map((item, i) => (
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

				{/* Stats */}
				<div className="flex flex-wrap justify-center gap-16 md:gap-24">
					{stats.map((stat, i) => (
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
	);
}
