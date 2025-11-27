import Link from 'next/link';
import { UserIcon } from '@/components/icons/ic_user';

const navItems = [
    { name: '검색', path: '/', isActive: true },
    { name: '대시보드', path: '/dashboard', isActive: false },
    { name: '챗봇', path: '/chatbot', isActive: false },
];

export default function Header() {
    return (
        // 1. 최상위 컨테이너: 커스텀 Black Opacity 배경 적용
        <header className="fixed top-0 left-0 w-full h-20 z-20 backdrop-blur-sm bg-black-10 flex justify-center items-center">

            {/* 2. 콘텐츠 래퍼: RootLayout에서 정의된 커스텀 패딩 및 브레이크포인트 적용 */}
            <div className="w-full max-w-[1680px] px-80 narrow:px-52 wide:px-110 flex justify-between items-center">

                <div className="flex justify-start items-center gap-10">
                    {/* 로고: got IT */}
                    <div className="text-white text-2xl font-normal font-['Dela_Gothic_One'] leading-6">
                        <Link href="/">got IT</Link>
                    </div>

                    {/* 네비게이션 메뉴 */}
                    <nav className="flex justify-start items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="w-24 py-2 rounded flex justify-center items-center"
                            >
                                <div
                                    className={`
                                        text-lg font-bold font-['Pretendard'] leading-7
                                        ${item.isActive ? 'text-primary-300' : 'text-neutral-300 hover:text-white'}
                                    `}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* 3. 프로필 아이콘 */}
                <div className="p-1.5 bg-white-10 rounded-full outline outline-1 outline-white/50 backdrop-blur-sm">
                    <div className="w-7 h-7 relative">
                        <UserIcon
                            className="w-full h-full text-white"
                            width={28}
                            height={28}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
