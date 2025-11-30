import { getTodaysTerm, getTermById } from "@/lib/terms";
import TodayTermCard from "./TodayTermCard";

interface TermData {
	title: string;
	slug: string;
	date: string;
	summary: string;
	description: string;
	tags: string[];
}

function formatDate(date: Date): string {
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default async function TodayTermCardWrapper() {
	// 날짜 기반으로 오늘의 용어 가져오기
	const todayTermIndex = await getTodaysTerm();

	if (!todayTermIndex) {
		// 폴백 데이터
		const fallbackData: TermData = {
			title: "TypeScript",
			slug: "typescript",
			date: formatDate(new Date()),
			summary: "자바스크립트에 타입을 추가해서 더 안전하게 코드를 작성하는 언어",
			description:
				"TypeScript는 JavaScript에 정적 타입을 추가한 프로그래밍 언어입니다. 컴파일 시점에 타입 오류를 발견할 수 있어 더 안전한 코드를 작성할 수 있습니다.",
			tags: ["프론트엔드", "언어", "타입시스템"],
		};
		return <TodayTermCard data={fallbackData} />;
	}

	// 상세 정보 가져오기
	const termDetail = await getTermById(todayTermIndex.id);

	if (!termDetail) {
		// 인덱스 정보만으로 구성
		const data: TermData = {
			title: todayTermIndex.termEn || todayTermIndex.termKo,
			slug: todayTermIndex.slug,
			date: formatDate(new Date()),
			summary: todayTermIndex.summary,
			description: todayTermIndex.summary,
			tags: todayTermIndex.tags,
		};
		return <TodayTermCard data={data} />;
	}

	// 전체 데이터로 구성
	const data: TermData = {
		title: termDetail.term.en || termDetail.term.ko,
		slug: termDetail.slug,
		date: formatDate(new Date()),
		summary: termDetail.onelinerForNonTech || termDetail.summary,
		description: termDetail.description,
		tags: termDetail.tags,
	};

	return <TodayTermCard data={data} />;
}
