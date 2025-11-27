"use client";

import { ArrowLeftIcon } from "@/components/icons";

export default function LoginFooter() {
	return (
		<button className="flex items-center gap-2" onClick={() => {}}>
			<ArrowLeftIcon className="text-gray-500" width={16} height={16} />
			<span className="text-gray-500">홈으로 돌아가기</span>
		</button>
	);
}
