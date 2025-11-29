"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type ToastType = "info" | "success" | "error" | "login";

type Toast = {
	id: string;
	message: string;
	type: ToastType;
};

type ToastContextType = {
	showToast: (message: string, type?: ToastType) => void;
	showLoginToast: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const router = useRouter();

	const showToast = useCallback((message: string, type: ToastType = "info") => {
		const id = Math.random().toString(36).substring(7);
		setToasts((prev) => [...prev, { id, message, type }]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3000);
	}, []);

	const showLoginToast = useCallback(() => {
		const id = "login-toast";
		setToasts((prev) => {
			if (prev.some((t) => t.id === id)) return prev;
			return [...prev, { id, message: "로그인이 필요한 기능입니다", type: "login" as ToastType }];
		});
	}, []);

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	const handleLogin = () => {
		removeToast("login-toast");
		router.push("/login");
	};

	return (
		<ToastContext.Provider value={{ showToast, showLoginToast }}>
			{children}
			<div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className="animate-slide-up flex items-center gap-3 rounded-xl bg-gray-900/95 px-5 py-3 shadow-lg ring-1 ring-white/10 backdrop-blur-sm"
					>
						{toast.type === "login" ? (
							<>
								<span className="text-sm text-gray-300">{toast.message}</span>
								<button
									onClick={handleLogin}
									className="rounded-lg bg-gradient-to-r from-[#6E50C8] to-[#CE5E61] px-3 py-1 text-sm font-medium text-white transition-opacity hover:opacity-90"
								>
									로그인하기
								</button>
								<button
									onClick={() => removeToast(toast.id)}
									className="ml-1 text-gray-500 hover:text-gray-300"
								>
									✕
								</button>
							</>
						) : (
							<span className="text-sm text-gray-300">{toast.message}</span>
						)}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
