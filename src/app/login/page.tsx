import LoginHeader from "@/app/login/auth/LoginHeader";
import LoginBody from "@/app/login/auth/LoginBody";
import LoginFooter from "@/app/login/auth/LoginFooter";

export default function LoginPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<LoginHeader />
			<LoginBody />
			<LoginFooter />
		</div>
	);
}
