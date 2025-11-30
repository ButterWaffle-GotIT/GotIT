import Link from "next/link";
import { LogoText } from "@/components/icons";

export function Logo() {
	return (
		<Link href="/" className="flex items-center">
			<LogoText width={89} height={30} />
		</Link>
	);
}
