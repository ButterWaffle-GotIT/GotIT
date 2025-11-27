import Link from "next/link";
import { UserIcon } from "@/components/icons/ic_user";

const navItems = [
	{ name: "검색", path: "/", isActive: true },
	{ name: "대시보드", path: "/dashboard", isActive: false },
	{ name: "챗봇", path: "/chatbot", isActive: false },
];

export default function Header() {
	return (
		// 1. 최상위 컨테이너: 커스텀 Black Opacity 배경 적용
		<header className="bg-black-10 fixed top-0 left-0 z-20 flex h-20 w-full items-center justify-center backdrop-blur-sm">
			{/* 2. 콘텐츠 래퍼: RootLayout에서 정의된 커스텀 패딩 및 브레이크포인트 적용 */}
			<div className="narrow:px-52 wide:px-110 flex w-full max-w-[1680px] items-center justify-between px-80">
				<div className="flex items-center justify-start gap-10">
					{/* 로고: got IT */}
					<div className="font-['Dela_Gothic_One'] text-2xl leading-6 font-normal text-white">
						<Link href="/">got IT</Link>
					</div>

					{/* 네비게이션 메뉴 */}
					<nav className="flex items-center justify-start gap-2">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.path}
								className="flex w-24 items-center justify-center rounded py-2"
							>
								<div
									className={`font-['Pretendard'] text-lg leading-7 font-bold ${item.isActive ? "text-primary-300" : "text-neutral-300 hover:text-white"} `}
								>
									{item.name}
								</div>
							</Link>
						))}
					</nav>
				</div>

				{/* 3. 프로필 아이콘 */}
				<div className="bg-white-10 rounded-full p-1.5 outline outline-1 outline-white/50 backdrop-blur-sm">
					<div className="relative h-7 w-7">
						<UserIcon
							className="h-full w-full text-white"
							width={28}
							height={28}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
