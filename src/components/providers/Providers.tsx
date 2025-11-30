"use client";

import { type ReactNode } from "react";
import { CombinedAuthProvider } from "@/contexts/auth";
import { ToastProvider } from "@/contexts/ToastContext";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<CombinedAuthProvider>
			<ToastProvider>{children}</ToastProvider>
		</CombinedAuthProvider>
	);
}
