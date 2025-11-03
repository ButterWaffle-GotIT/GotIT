import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	webpack: (config) => {
		// SVG를 컴포넌트로 import(기본)
		// `?url` 쿼리로 가져오면 파일 URL로 처리(이미지처럼 사용)
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			oneOf: [
				{ resourceQuery: /url/, type: "asset/resource" }, // ex) import iconUrl from './icon.svg?url'
				{ use: ["@svgr/webpack"] }, // ex) import Icon from './icon.svg'
			],
		});
		return config;
	},
};

export default nextConfig;
