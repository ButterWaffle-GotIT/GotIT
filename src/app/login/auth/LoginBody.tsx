"use client";

import { GoogleLoginButtonIcon } from "@/components/buttons/GoogleLoginButtonIcon";

export default function LoginBody() {
	return (
		<div className="glass rounded-[1.25rem] bg-white/5 px-20 py-22">
			<div className="flex flex-col gap-3">
				<h1 className="text-center text-4xl font-bold text-white">
					환영합니다
				</h1>
				<p className="text-center text-gray-400">
					구글 계정으로 간편하게 시작하세요
				</p>
			</div>

			<div className="mt-12 flex flex-col gap-12">
				<button onClick={() => {}}>
					<GoogleLoginButtonIcon />
				</button>

				<div className="flex items-center">
					<div className="h-px w-35 shrink-0 bg-gray-600" />
					<span className="mx-[0.88rem] text-gray-500">또는</span>
					<div className="h-px w-35 shrink-0 bg-gray-600" />
				</div>

				<button
					onClick={() => {}}
					className="bg-white-10 flex items-center self-stretch rounded-[0.625rem] px-[9.15625rem] py-3.5 text-gray-400"
				>
					둘러보기
				</button>
			</div>
		</div>
	);
}
