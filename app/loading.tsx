export default function Loading() {
	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center'>
			<div className='flex flex-col items-center gap-4'>
				<div className='h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600' />
				<p className='text-sm text-muted-foreground animate-pulse'>
					Loading...
				</p>
			</div>
		</div>
	);
}
