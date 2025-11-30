/**
 * 브랜드 테마 상수
 */

export const BRAND_COLORS = {
	purple: "#6E50C8",
	red: "#CE5E61",
} as const;

export const BRAND_GRADIENT = {
	bg: "bg-gradient-to-r from-brand-purple to-brand-red",
	text: "bg-gradient-to-r from-brand-purple to-brand-red bg-clip-text text-transparent",
} as const;

export const BRAND_GRADIENT_INLINE = `linear-gradient(90deg, ${BRAND_COLORS.purple} 0.02%, ${BRAND_COLORS.red} 99.98%)`;
