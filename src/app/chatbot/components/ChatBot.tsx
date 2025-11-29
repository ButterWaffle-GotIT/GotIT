"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChatResponse } from "@/app/chatbot/utils/actions";
import { FireIcon, StarIcon, SearchIcon, SendIcon } from "@/components/icons";
import ChatMessage from "./ChatMessage";
import UserMessage from "./UserMessage";
import QuickActionButton from "./QuickActionButton";
import BotLoading from "./BotLoading";

interface Message {
	role: "user" | "bot";
	content: string;
	recommendations?: string[];
}

export default function ChatBot() {
	const router = useRouter();
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "bot",
			content: "안녕하세요! 기술 용어에 대해 궁금한 점을 물어보세요.",
			recommendations: ["REST API란?", "Docker는 뭐야?", "GraphQL 설명해줘"],
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatAreaRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
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
	};

	const handleRecommendationClick = (question: string) => {
		handleSubmit(undefined, question);
	};

	return (
		<div className="mx-auto flex h-screen w-full max-w-260 flex-col">
			<div
				ref={chatAreaRef}
				className="flex-1 overflow-y-auto px-4 pt-20"
				style={{ paddingBottom: "11rem" }}
			>
				<div className="flex flex-col gap-15">
					{messages.map((msg, index) =>
						msg.role === "bot" ? (
							<ChatMessage
								key={index}
								content={msg.content}
								recommendations={msg.recommendations}
								onRecommendationClick={handleRecommendationClick}
							/>
						) : (
							<UserMessage key={index} content={msg.content} />
						)
					)}
					{isLoading && <BotLoading />}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<div
				className="fixed right-0 bottom-0 left-0 h-44"
				style={{
					background:
						"linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%)",
					backdropFilter: "blur(24px)",
					WebkitBackdropFilter: "blur(24px)",
				}}
			>
				<div className="mx-auto w-full max-w-260 px-4">
					<div className="mt-[1.06rem] mb-[1.44rem] flex items-center justify-center gap-5">
						<QuickActionButton
							icon={
								<FireIcon width={14} height={14} className="text-[#FB923C]" />
							}
							label="인기 용어"
							onClick={() => router.push("/search")}
						/>
						<QuickActionButton
							icon={
								<StarIcon width={14} height={14} className="text-[#FACC15]" />
							}
							label="오늘의 용어"
							onClick={() => router.push("/dashboard")}
						/>
						<QuickActionButton
							icon={
								<SearchIcon width={14} height={14} className="text-[#22D3EE]" />
							}
							label="용어 검색"
							onClick={() => router.push("/search")}
						/>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="bg-black-80 rounded-xl border-[0.5px] border-gray-500 px-5 py-3">
							<div className="flex items-center gap-3">
								<textarea
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSubmit();
										}
									}}
									placeholder="궁금한 기술 용어를 물어보세요..."
									disabled={isLoading}
									className="text-body4 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-gray-500"
									rows={1}
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="from-brand-purple to-brand-red flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-r transition-opacity hover:opacity-90 disabled:opacity-50"
								>
									<SendIcon width={24} height={24} className="text-white" />
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
