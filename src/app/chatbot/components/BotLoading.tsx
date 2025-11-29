import { RobotIcon } from "@/components/icons";

export default function BotLoading() {
	return (
		<div className="animate-fade-in flex items-start gap-3">
			<div className="from-brand-purple to-brand-red flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-[0.58331rem] bg-linear-to-r">
				<RobotIcon width={24} height={24} className="text-white" />
			</div>

			<div className="flex max-w-207 flex-col gap-[0.62rem]">
				<div className="w-fit rounded-[0_1.25rem_1.25rem_1.25rem] border border-gray-700 bg-gray-900 px-6 py-5">
					<div className="flex h-6 items-center space-x-1.5">
						<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
						<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
						<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
