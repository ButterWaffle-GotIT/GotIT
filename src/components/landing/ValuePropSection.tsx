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
							GotIT은 복잡한 IT 용어를 누구나 이해할 수 있는 말로 풀어드립니다.
							실제 업무에서 쓰이는 예시와 함께요.
						</motion.p>
					</div>
				</div>
			</div>
		</section>
	);
}
