export function MarqueeText() {
	const items = [
		"Frontend",
		"Backend",
		"DevOps",
		"Cloud",
		"AI/ML",
		"Data",
		"Security",
		"UI/UX",
		"Mobile",
	];

	return (
		<div className="animate-marquee flex gap-8">
			{[...items, ...items].map((item, i) => (
				<span
					key={i}
					className="text-sm tracking-widest whitespace-nowrap text-gray-600 uppercase"
				>
					{item}
				</span>
			))}
		</div>
	);
}
