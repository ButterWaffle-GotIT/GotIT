"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GoogleLoginButtonIcon } from "@/components/buttons/GoogleLoginButtonIcon";
import { useAuthCore, useUserData } from "@/contexts/auth";

export default function LoginBody() {
	const router = useRouter();
	const { loginWithGoogle, loginWithDemo } = useAuthCore();
	const { isNewUser, userDataLoading } = useUserData();
	const isLoggingIn = useRef(false);

	// 로그인 후 userData 로딩이 완료되면 라우팅
	useEffect(() => {
		if (isLoggingIn.current && !userDataLoading) {
			if (isNewUser) {
				router.push("/onboarding");
			} else {
				router.push("/");
			}
			isLoggingIn.current = false;
		}
	}, [isNewUser, userDataLoading, router]);

	const handleGoogleLogin = async () => {
		try {
			isLoggingIn.current = true;
			await loginWithGoogle();
		} catch (error) {
			isLoggingIn.current = false;
			console.error("로그인 중 오류 발생:", error);
		}
	};

	const handleDemoLogin = async () => {
		try {
			isLoggingIn.current = true;
			await loginWithDemo();
		} catch (error) {
			isLoggingIn.current = false;
			console.error("데모 계정 로그인 중 오류 발생:", error);
			alert("데모 계정 로그인에 실패했습니다.");
		}
	};

	const handleSkip = () => {
		router.push("/");
	};

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
				<div className="flex flex-col gap-3">
					<button onClick={handleGoogleLogin}>
						<GoogleLoginButtonIcon />
					</button>
					<button
						onClick={handleDemoLogin}
						className="text-sm text-gray-400 underline transition-colors hover:text-gray-300"
					>
						데모 계정으로 체험하기
					</button>
				</div>

				<div className="flex items-center">
					<div className="h-px w-35 shrink-0 bg-gray-600" />
					<span className="mx-[0.88rem] text-gray-500">또는</span>
					<div className="h-px w-35 shrink-0 bg-gray-600" />
				</div>

				<button
					onClick={handleSkip}
					className="bg-white-10 flex items-center self-stretch rounded-[0.625rem] px-[9.15625rem] py-3.5 text-gray-400"
				>
					둘러보기
				</button>
			</div>
		</div>
	);
}
