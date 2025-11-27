import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	// Turbopack 설정 (빈 객체여도 선언해두면 명시적으로 Turbopack 사용)
	turbopack: {
		// SVGR: .svg를 React 컴포넌트로 import 할 수 있게
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js", // SVGR 출력물을 JS로 취급
			},
		},
	},
	// Webpack 설정
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

export default nextConfig;
