"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchIcon, ArrowRightIcon } from "@/components/icons";

export function CTASection() {
	const router = useRouter();

	return (
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
	);
}
