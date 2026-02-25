export default function EventsLoading() {
	return (
		<div className='min-h-[60vh]'>
			<div className='bg-gray-100 py-16 mb-12'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4' />
					<div className='h-5 w-80 bg-gray-200 rounded animate-pulse mx-auto' />
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{[1, 2, 3].map((i) => (
						<div key={i} className='rounded-xl border bg-card p-6 space-y-3'>
							<div className='h-5 w-20 bg-gray-200 rounded-full animate-pulse' />
							<div className='h-6 w-3/4 bg-gray-200 rounded animate-pulse' />
							<div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse' />
							<div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
