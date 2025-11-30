export default function RecommendedTermCardSkeleton() {
	return (
		<div className="flex w-64 flex-col items-start justify-start gap-2.5 overflow-hidden rounded-xl bg-black/50 p-5 outline outline-[0.25px] outline-white/25">
			<div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
				<div className="inline-flex items-center justify-start gap-1 self-stretch">
					<div className="flex flex-1 items-center justify-start gap-2">
						<div className="h-6 w-6 animate-pulse rounded-full bg-gray-700" />

						<div className="h-6 w-24 animate-pulse rounded bg-gray-700" />
					</div>

					<div className="h-5 w-16 animate-pulse rounded-full bg-gray-700" />
				</div>

				<div className="flex flex-col gap-1.5 self-stretch">
					<div className="h-4 w-full animate-pulse rounded bg-gray-700" />
					<div className="h-4 w-3/4 animate-pulse rounded bg-gray-700" />
				</div>
			</div>
		</div>
	);
}
