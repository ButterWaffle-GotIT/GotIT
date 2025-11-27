import type { Metadata } from "next";
import "@/styles/globals.css";
import Image from "next/image";
import { FirebaseAnalytics } from "@/components/providers/FirebaseAnalytics";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
	title: "got IT - IT 용어사전",
	description: "Developer-friendly glossary",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body className="bg-bg relative min-h-screen">
				<Image
					src="/images/gradient.webp"
					alt=""
					fill
					className="pointer-events-none fixed z-0 object-cover object-top"
					priority
				/>

				<FirebaseAnalytics />
				<Header isLoggedIn={false} showNav={true} />
				<div className="w-content relative z-10 mx-auto">
					{children}
				</div>
			</body>
		</html>
	);
}
