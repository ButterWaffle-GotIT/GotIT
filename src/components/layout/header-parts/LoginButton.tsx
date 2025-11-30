import { GlassButton } from "@/components/ui/GlassButton";

interface LoginButtonProps {
	onClick: () => void;
}

export function LoginButton({ onClick }: LoginButtonProps) {
	return (
		<GlassButton className="px-6 py-2" onClick={onClick}>
			<span className="text-base leading-7 font-bold text-neutral-300 transition-colors hover:text-white">
				로그인
			</span>
		</GlassButton>
	);
}
