"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchIcon, ArrowRightIcon, LogoText } from "@/components/icons";

export function CTASection() {
	const router = useRouter();

	return (
		<section className="h-screen flex flex-col justify-between px-12 md:px-24 lg:px-60 py-32 snap-start snap-always">
			<div className="flex-1 flex items-center">
				<div className="mx-auto max-w-4xl text-center w-full">
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
			</div>

			{/* Footer */}
			<footer className="border-t border-gray-800 pt-12">
				<div className="flex items-center justify-between max-w-6xl mx-auto">
					<LogoText width={89} height={30} />
					<p className="text-xs text-gray-600">© 2025</p>
				</div>
			</footer>
		</section>
	);
}
