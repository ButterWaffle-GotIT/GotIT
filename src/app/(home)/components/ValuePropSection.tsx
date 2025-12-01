"use client";

import { motion } from "framer-motion";

export function ValuePropSection() {
	return (
		<section className="flex h-screen snap-start snap-always items-center px-12 py-32 md:px-24 lg:px-60">
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
							낯선 IT 용어,
							<br />
							맥락으로 이해하세요.
						</motion.p>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-lg leading-relaxed text-gray-500"
						>
							사전적 정의만으로는 이해하기 힘든 실무 용어들. GotIT은 업무 상황에
							맞는 예시와 함께 용어의 뜻을 명확히 전달합니다.
						</motion.p>
					</div>
				</div>
			</div>
		</section>
	);
}
