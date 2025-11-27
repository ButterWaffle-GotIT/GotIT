import LoginHeader from "@/components/auth/LoginHeader";
import LoginBody from "@/components/auth/LoginBody";
import LoginFooter from "@/components/auth/LoginFooter";

export default function LoginPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<LoginHeader />
			<LoginBody />
			<LoginFooter />
		</div>
	);
}
