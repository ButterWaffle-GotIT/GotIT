/**
 * 서버 전용 용어 데이터 로더 (Node.js fs 사용)
 */

import fs from "fs";
import path from "path";
import type { TermIndexItem, TermDetail } from "./terms";

/**
 * 서버에서 용어 인덱스 로드 (파일 시스템)
 */
export function getTermsIndexServer(): TermIndexItem[] {
	const filePath = path.join(
		process.cwd(),
		"public",
		"terms",
		"terms.index.json"
	);
	const fileContent = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileContent);
}

/**
 * 서버에서 ID로 용어 상세 정보 가져오기
 */
export function getTermByIdServer(id: number): TermDetail | null {
	const index = getTermsIndexServer();
	const item = index.find((t) => t.id === id);

	if (!item) return null;

	const filePath = path.join(process.cwd(), "public", item.file);
	const fileContent = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileContent);
}

/**
 * 서버에서 오늘의 용어 가져오기
 */
export function getTodaysTermServer(): TermIndexItem | null {
	const index = getTermsIndexServer();
	if (index.length === 0) return null;

	const daysSinceEpoch = Math.floor(Date.now() / 86400000);
	const todayIndex = daysSinceEpoch % index.length;

	return index[todayIndex];
}

/**
 * 서버에서 오늘의 용어 한국어 이름만 가져오기
 */
export function getTodaysTermNameServer(): string | null {
	const term = getTodaysTermServer();
	return term ? term.termKo : null;
}
