"use client";

import { FireIcon, StarIcon, SearchIcon, SendIcon } from "@/components/icons";
import { useChatBot } from "@/hooks/useChatBot";
import ChatMessage from "./ChatMessage";
import UserMessage from "./UserMessage";
import QuickActionButton from "./QuickActionButton";
import BotLoading from "./BotLoading";

export default function ChatBot() {
	const {
		messages,
		input,
		isLoading,
		messagesEndRef,
		setInput,
		handleSubmit,
		handleRecommendationClick,
	} = useChatBot();

	return (
		<div className="mx-auto min-h-screen w-full max-w-260 px-4 pt-20">
			<div className="flex flex-col gap-15 pb-52">
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
							onClick={() =>
								handleSubmit(
									undefined,
									"React, Next.js, Docker 이 세 가지 용어를 각각 설명해줘."
								)
							}
						/>
						<QuickActionButton
							icon={
								<StarIcon width={14} height={14} className="text-[#FACC15]" />
							}
							label="오늘의 용어"
							onClick={() => handleSubmit(undefined, "TypeScript")}
						/>
						<QuickActionButton
							icon={
								<SearchIcon width={14} height={14} className="text-[#22D3EE]" />
							}
							label="용어 검색"
							onClick={() =>
								handleSubmit(undefined, "gotIT에 없는 단어를 검색해주세요")
							}
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
