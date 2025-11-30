"use client";

/**
 * AuthContext - 레거시 호환성 파일
 */

export {
	CombinedAuthProvider as AuthProvider,
	useAuth,
	type UserData,
} from "./auth";

export { useAuthCore, useUserData, useScrap } from "./auth";
