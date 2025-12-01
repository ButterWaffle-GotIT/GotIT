import { CalendarIcon } from "@/components/icons";

interface FooterProps {
	updatedAt: string;
}

export function Footer({ updatedAt }: FooterProps) {
	return (
		<footer className="flex flex-col gap-5">
			<div className="h-px bg-gray-700" />
			<div className="flex items-center gap-1 text-gray-500">
				<CalendarIcon size={14} color="#9E9E9E" />
				<span className="text-body5">마지막 업데이트:</span>
				<span className="text-body5">{updatedAt.replace(/-/g, ".")}</span>
			</div>
		</footer>
	);
}
