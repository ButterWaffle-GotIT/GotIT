"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo(0, 0);

		const allScrollableElements = document.querySelectorAll(
			'[class*="overflow"]'
		);
		allScrollableElements.forEach((el) => {
			if (el instanceof HTMLElement) {
				el.scrollTop = 0;
			}
		});
	}, [pathname]);

	return null;
}
