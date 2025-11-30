"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RotatingWordsProps {
	words: string[];
}

export function RotatingWords({ words }: RotatingWordsProps) {
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
