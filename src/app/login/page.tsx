import LoginHeader from "./components/LoginHeader";
import LoginBody from "./components/LoginBody";
import LoginFooter from "./components/LoginFooter";

export default function LoginPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<LoginHeader />
			<LoginBody />
			<LoginFooter />
		</div>
	);
}
