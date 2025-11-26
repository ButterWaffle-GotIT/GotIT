"use client";

import { useEffect } from "react";

import { initFirebaseAnalytics } from "@/utils/firebase";

export function FirebaseAnalytics() {
	useEffect(() => {
		void initFirebaseAnalytics();
	}, []);

	return null;
}
