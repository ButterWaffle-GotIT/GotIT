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
	const seenIds = new Map();
	const seenSlugs = new Map();
	const duplicateIds = [];
	const duplicateSlugs = [];

	for (const category of categories) {
		if (!/^\d+$/.test(category)) continue;

		const categoryPath = join(TERMS_DIR, category);
		const files = await readdir(categoryPath);

		for (const file of files) {
			if (!file.endsWith(".json")) continue;

			const filePath = join(categoryPath, file);
			const content = await readFile(filePath, "utf-8");
			const term = JSON.parse(content);

			// ID 중복 검사
			if (seenIds.has(term.id)) {
				const existingFile = seenIds.get(term.id);
				duplicateIds.push({
					id: term.id,
					first: existingFile,
					duplicate: filePath,
				});
			} else {
				seenIds.set(term.id, filePath);
			}

			// Slug 중복 검사
			if (seenSlugs.has(term.slug)) {
				const existingFile = seenSlugs.get(term.slug);
				duplicateSlugs.push({
					slug: term.slug,
					first: existingFile,
					duplicate: filePath,
				});
			} else {
				seenSlugs.set(term.slug, filePath);
			}

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

	// 모든 중복 리포트
	if (duplicateIds.length > 0 || duplicateSlugs.length > 0) {
		console.error("❌ Duplicate validation failed!");

		if (duplicateIds.length > 0) {
			duplicateIds.forEach(({ id, first, duplicate }) => {
				console.error(`   ID ${id}: ${first} ↔ ${duplicate}`);
			});
		}

		if (duplicateSlugs.length > 0) {
			duplicateSlugs.forEach(({ slug, first, duplicate }) => {
				console.error(`   slug "${slug}": ${first} ↔ ${duplicate}`);
			});
		}

		process.exit(1);
	}

	// id 기준 정렬
	index.sort((a, b) => a.id - b.id);

	await writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), "utf-8");

	console.log(`✅ Generated index (${index.length} terms, no duplicates)`);
}

generateIndex().catch(console.error);
