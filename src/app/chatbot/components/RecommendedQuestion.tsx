interface RecommendedQuestionProps {
	text: string;
	onClick: () => void;
}

export default function RecommendedQuestion({
	text,
	onClick,
}: RecommendedQuestionProps) {
	return (
		<button
			onClick={onClick}
			className="border-primary-600 bg-white-10 text-button-small hover:bg-white-20 rounded-lg border-[0.5px] px-3 py-2 text-white transition-colors"
		>
			{text}
		</button>
	);
}
