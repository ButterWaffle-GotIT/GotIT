"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getChatResponse } from "@/app/chatbot/utils/actions";
import {
	getPopularTermsQuery,
	getTodaysTermQuery,
} from "@/app/chatbot/utils/quick-actions";
import { useUserData } from "@/contexts/auth";

interface Message {
	role: "user" | "bot";
	content: string;
	recommendations?: string[];
}

interface UseChatBotReturn {
	messages: Message[];
	input: string;
	isLoading: boolean;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	setInput: (value: string) => void;
	handleSubmit: (e?: React.FormEvent, customInput?: string) => Promise<void>;
	handleRecommendationClick: (question: string) => void;
	handlePopularTerms: () => Promise<void>;
	handleTodaysTerm: () => Promise<void>;
}

const INITIAL_MESSAGE: Message = {
	role: "bot",
	content: "안녕하세요! 기술 용어에 대해 궁금한 점을 물어보세요.",
	recommendations: ["REST API란?", "Docker는 뭐야?", "GraphQL 설명해줘"],
};

export function useChatBot(): UseChatBotReturn {
	const { userData } = useUserData();
	const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = useCallback(
		async (e?: React.FormEvent, customInput?: string) => {
			e?.preventDefault();
			const userMessage = customInput || input;

			if (!userMessage.trim() || isLoading) return;

			setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
			setInput("");
			setIsLoading(true);

			const result = await getChatResponse(userMessage);

			setMessages((prev) => [
				...prev,
				{
					role: "bot",
					content: result.answer,
					recommendations: result.recommendations,
				},
			]);
			setIsLoading(false);
		},
		[input, isLoading]
	);

	const handleRecommendationClick = useCallback(
		(question: string) => {
			handleSubmit(undefined, question);
		},
		[handleSubmit]
	);

	const handlePopularTerms = useCallback(async () => {
		const category = userData?.selectedCategory || "all";
		const query = await getPopularTermsQuery(category);
		await handleSubmit(undefined, query);
	}, [userData, handleSubmit]);

	const handleTodaysTerm = useCallback(async () => {
		const query = await getTodaysTermQuery();
		await handleSubmit(undefined, query);
	}, [handleSubmit]);

	return {
		messages,
		input,
		isLoading,
		messagesEndRef,
		setInput,
		handleSubmit,
		handleRecommendationClick,
		handlePopularTerms,
		handleTodaysTerm,
	};
}
