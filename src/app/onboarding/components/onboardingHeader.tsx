import { LogoText } from "@/components/icons";

export default function OnboardingHeader() {
	return (
		<div className="flex flex-col items-center">
			<LogoText width={200} height={60} />
			<p className="gap-3 text-gray-300 text-body2">관심 있는 분야를 선택해주세요</p>
			<p className="mt-2.5 text-gray-400 text-caption1">맞춤형 IT 용어를 추천해드릴게요</p>
		</div>
	);
}
