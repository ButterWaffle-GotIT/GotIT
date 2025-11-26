/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {},
	},
	plugins: [],

	safelist: [
    // --- 모든 태그 색상에 대한 50% 및 10% 조합을 강제 등록 (Hover Fix) ---
    // 주의: 'bg-color/50'이 이미 작동하더라도 명시적으로 등록하면 안전성이 높아집니다.
    // 50% (Selected/Active State)
    'bg-gray-400/50',
    'bg-cyan-400/50',
    'bg-green-600/50',
    'bg-rose-400/50',
    'bg-violet-400/50',
    'bg-sky-400/50',
    'bg-teal-400/50',
    'bg-orange-400/50',
    'bg-amber-400/50',
    'bg-blue-400/50',

    // 10% (Hover State)
    'hover:bg-gray-400/10',
    'hover:bg-cyan-400/10',
    'hover:bg-green-600/10',
    'hover:bg-rose-400/10',
    'hover:bg-violet-400/10',
    'hover:bg-sky-400/10',
    'hover:bg-teal-400/10',
    'hover:bg-orange-400/10',
    'hover:bg-amber-400/10',
    'hover:bg-blue-400/10',

    // --- 기타 필요한 유틸리티 클래스 (테두리 및 기본 투명도) ---
    'bg-white/5',
    'outline-white',
    'outline-white-30',
    'hover:outline-white-50',
  ],
};
