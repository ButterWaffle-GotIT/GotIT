"use client";

import { type ReactNode } from "react";
import { AuthProvider, useAuthCore } from "./AuthContext";
import {
	UserDataProvider,
	useUserData,
	type UserData,
} from "./UserDataContext";
import { ScrapProvider, useScrap } from "./ScrapContext";

export type { UserData };

export function CombinedAuthProvider({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<UserDataProvider>
				<ScrapProvider>{children}</ScrapProvider>
			</UserDataProvider>
		</AuthProvider>
	);
}

export { useAuthCore, useUserData, useScrap };
export { AuthProvider } from "./AuthContext";
export { UserDataProvider } from "./UserDataContext";
export { ScrapProvider } from "./ScrapContext";
