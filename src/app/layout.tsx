import type { Metadata } from "next";
import "@/styles/globals.css";
import Image from "next/image";

export const metadata: Metadata = {
	title: "GOTIT",
	description: "Developer-friendly glossary",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body className="relative min-h-screen bg-[#101010]">
				<Image
					src="/images/gradient.webp"
					alt=""
					width={1680}
					height={1080}
					className="pointer-events-none fixed inset-y-0 right-0 z-0 h-full w-auto"
					priority
				/>

				<div className="w-content narrow:px-52 wide:px-110 relative z-10 mx-auto max-w-full px-80">
					{children}
				</div>
			</body>
		</html>
	);
}
