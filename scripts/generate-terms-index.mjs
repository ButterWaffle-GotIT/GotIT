#!/usr/bin/env node
/**
 * public/terms/ 폴더의 모든 JSON 파일을 스캔하여
 * terms.index.json을 생성하는 스크립트
 *
 * 실행: node scripts/generate-terms-index.mjs
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const TERMS_DIR = "./public/terms";
const OUTPUT_FILE = "./public/terms/terms.index.json";

async function generateIndex() {
	const index = [];
	const categories = await readdir(TERMS_DIR);

	for (const category of categories) {
		if (!/^\d+$/.test(category)) continue;

		const categoryPath = join(TERMS_DIR, category);
		const files = await readdir(categoryPath);

		for (const file of files) {
			if (!file.endsWith(".json")) continue;

			const filePath = join(categoryPath, file);
			const content = await readFile(filePath, "utf-8");
			const term = JSON.parse(content);

			// index용 최소 필드만 추출
			index.push({
				id: term.id,
				slug: term.slug,
				termKo: term.term?.ko || term.termKo,
				termEn: term.term?.en || term.termEn,
				summary: term.summary,
				tags: term.tags || [],
				primaryTag: term.primaryTag,
				level: term.level,
				// 동적 fetch용 파일 경로
				file: `/terms/${category}/${file}`,
			});
		}
	}

	// id 기준 정렬
	index.sort((a, b) => a.id - b.id);

	await writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), "utf-8");

	console.log(`✅ Generated ${OUTPUT_FILE}`);
	console.log(`   Total terms: ${index.length}`);

	// 카테고리별 통계
	const stats = {};
	for (const item of index) {
		const cat = Math.floor(item.id / 1000) * 1000;
		stats[cat] = (stats[cat] || 0) + 1;
	}
	console.log("   By category:", stats);
}

generateIndex().catch(console.error);
