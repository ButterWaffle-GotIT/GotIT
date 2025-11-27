import { LogoText } from "@/components/icons";

export default function LoginHeader() {
	return (
		<div className="flex flex-col items-center">
			<LogoText width={200} height={60} />
			<div className="h-2.5" />
			<p className="text-gray-400">IT 용어를 쉽게 찾아보세요</p>
		</div>
	);
}
