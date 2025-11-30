import type { Metadata } from "next";
import "@/styles/globals.css";
import { FirebaseAnalytics } from "@/components/providers/FirebaseAnalytics";
import { Providers } from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";

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
				<div
					className="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full bg-cover bg-top bg-no-repeat"
					style={{ backgroundImage: "url('/images/gradient.webp')" }}
				/>

				<ScrollToTop />
				<FirebaseAnalytics />
				<Providers>
					<div className="relative z-50">
						<Header showNav={true} />
					</div>
					<div className="w-content relative z-10 mx-auto">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
