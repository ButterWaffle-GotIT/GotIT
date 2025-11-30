"use client";

import { motion } from "framer-motion";

export function StatsSection() {
	const stats = [
		{ value: "220+", label: "용어" },
		{ value: "9", label: "카테고리" },
	];

	return (
		<section className="px-6 py-32 md:px-12 lg:px-24">
			<div className="mx-auto max-w-6xl">
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
