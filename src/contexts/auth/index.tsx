"use client";

/**
 * Auth 모듈 통합 Export
 */

import { type ReactNode } from "react";

// 개별 Context들
import { AuthProvider, useAuthCore } from "./AuthContext";
import {
	UserDataProvider,
	useUserData,
	type UserData,
} from "./UserDataContext";
import { ScrapProvider, useScrap } from "./ScrapContext";

// 타입 re-export
export type { UserData };

/**
 * 통합 Provider
 */
export function CombinedAuthProvider({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<UserDataProvider>
				<ScrapProvider>{children}</ScrapProvider>
			</UserDataProvider>
		</AuthProvider>
	);
}

// Hooks export
export { useAuthCore, useUserData, useScrap };

// Individual Providers export
export { AuthProvider } from "./AuthContext";
export { UserDataProvider } from "./UserDataContext";
export { ScrapProvider } from "./ScrapContext";
