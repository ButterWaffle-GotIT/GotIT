interface UserMessageProps {
	content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
	return (
		<div className="flex justify-end">
			<div className="bg-primary-950 text-body3 max-w-207 rounded-[1.25rem_1.25rem_0_1.25rem] px-8 py-7 text-white">
				{content}
			</div>
		</div>
	);
}
