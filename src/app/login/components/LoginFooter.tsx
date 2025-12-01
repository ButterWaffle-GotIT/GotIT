"use client";

import { ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";

export default function LoginFooter() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<ArrowLeftIcon className="text-gray-500" width={16} height={16} />
			<span className="text-gray-500">홈으로 돌아가기</span>
		</Link>
	);
}
