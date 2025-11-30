/**
 * 용어 데이터 fetch 및 검색 헬퍼
 */

// Index 아이템 타입
export interface TermIndexItem {
	id: number;
	slug: string;
	termKo: string;
	termEn?: string;
	summary: string;
	tags: string[];
	primaryTag: string;
	level: "beginner" | "intermediate" | "advanced";
	file: string;
}

// 역할 타입
export type Role = "PM" | "Dev" | "Design" | "Marketer" | "Other";

// 사용 사례 타입
export interface UseCase {
	role: Role;
	text: string;
}

// 대화 상황 타입 (deprecated - useCases로 대체)
export interface Conversation {
	role: "pm" | "developer" | "designer";
	message: string;
}

// 상세 용어 타입
export interface TermDetail {
	id: number;
	slug: string;
	term: {
		ko: string;
		en: string;
	};
	aliases?: string[];
	summary: string;
	onelinerForNonTech?: string;
	description: string;
	tags: string[];
	primaryTag: string;
	relatedIds?: number[];
	confusableIds?: number[];
	useCases?: UseCase[];
	conversations?: Conversation[];
	keywords?: string[];
	level: "beginner" | "intermediate" | "advanced";
	updatedAt: string;
	status?: "draft" | "published";
}

// 캐시
let indexCache: TermIndexItem[] | null = null;

/**
 * 인덱스 데이터 검증 - 중복 ID/slug 체크
 */
function validateIndex(index: TermIndexItem[]): void {
	const seenIds = new Map<number, string>();
	const seenSlugs = new Map<string, string>();

	for (const item of index) {
		// ID 중복 체크
		if (seenIds.has(item.id)) {
			throw new Error(
				`Duplicate ID ${item.id}: ${seenIds.get(item.id)} ↔ ${item.file}`
			);
		}

		// Slug 중복 체크
		if (seenSlugs.has(item.slug)) {
			throw new Error(
				`Duplicate slug "${item.slug}": ${seenSlugs.get(item.slug)} ↔ ${item.file}`
			);
		}

		seenIds.set(item.id, item.file);
		seenSlugs.set(item.slug, item.file);
	}
}

/**
 * 용어 인덱스 전체 로드 (캐싱됨)
 */
export async function getTermsIndex(): Promise<TermIndexItem[]> {
	if (indexCache) return indexCache;

	const res = await fetch("/terms/terms.index.json");
	if (!res.ok) throw new Error("Failed to load terms index");

	const data: TermIndexItem[] = await res.json();

	// 개발 환경에서 중복 검증
	if (process.env.NODE_ENV === "development") {
		validateIndex(data);
	}

	indexCache = data;
	return data;
}

/**
 * ID로 용어 상세 정보 가져오기
 */
export async function getTermById(id: number): Promise<TermDetail | null> {
	const index = await getTermsIndex();
	const item = index.find((t) => t.id === id);

	if (!item) return null;

	const res = await fetch(item.file);
	if (!res.ok) return null;

	return res.json();
}

/**
 * slug로 용어 상세 정보 가져오기
 */
export async function getTermBySlug(slug: string): Promise<TermDetail | null> {
	const index = await getTermsIndex();
	const item = index.find((t) => t.slug === slug);

	if (!item) return null;

	const res = await fetch(item.file);
	if (!res.ok) return null;

	return res.json();
}

/**
 * 카테고리(primaryTag)로 용어 목록 필터링
 */
export async function getTermsByTag(tag: string): Promise<TermIndexItem[]> {
	const index = await getTermsIndex();
	return index.filter((t) => t.primaryTag === tag);
}

/**
 * 카테고리(1000, 2000, ...)로 용어 목록 가져오기
 */
export async function getTermsByCategory(
	category: number
): Promise<TermIndexItem[]> {
	const index = await getTermsIndex();
	return index.filter(
		(t) => Math.floor(t.id / 1000) * 1000 === category || t.id === category
	);
}

/**
 * 간단한 검색 (termKo, summary, tags에서 검색)
 * 더 정교한 검색이 필요하면 Fuse.js 도입 권장
 */
export async function searchTerms(query: string): Promise<TermIndexItem[]> {
	if (!query.trim()) return [];

	const index = await getTermsIndex();
	const q = query.toLowerCase();

	return index.filter(
		(t) =>
			t.termKo.toLowerCase().includes(q) ||
			t.termEn?.toLowerCase().includes(q) ||
			t.summary.toLowerCase().includes(q) ||
			t.tags.some((tag) => tag.toLowerCase().includes(q))
	);
}

/**
 * 오늘의 용어 (날짜 기반 순환)
 */
export async function getTodaysTerm(): Promise<TermIndexItem | null> {
	const index = await getTermsIndex();
	if (index.length === 0) return null;

	const daysSinceEpoch = Math.floor(Date.now() / 86400000);
	const todayIndex = daysSinceEpoch % index.length;

	return index[todayIndex];
}

/**
 * 관련 용어 가져오기
 */
export async function getRelatedTerms(
	relatedIds: number[]
): Promise<TermIndexItem[]> {
	const index = await getTermsIndex();
	return index.filter((t) => relatedIds.includes(t.id));
}

/**
 * 랜덤 용어 N개 가져오기
 */
export async function getRandomTerms(count: number): Promise<TermIndexItem[]> {
	const index = await getTermsIndex();
	const shuffled = [...index].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

/**
 * 모든 태그 목록 가져오기
 */
export async function getAllTags(): Promise<string[]> {
	const index = await getTermsIndex();
	const tagSet = new Set<string>();

	for (const item of index) {
		item.tags.forEach((tag) => tagSet.add(tag));
	}

	return Array.from(tagSet).sort();
}
