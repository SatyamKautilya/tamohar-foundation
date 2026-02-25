'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
			<div className='text-center max-w-md'>
				<AlertTriangle className='h-12 w-12 text-yellow-500 mx-auto mb-4' />
				<h2 className='text-2xl font-bold mb-2'>Something went wrong</h2>
				<p className='text-muted-foreground mb-6 text-sm'>
					{error.message || 'An unexpected error occurred. Please try again.'}
				</p>
				<Button onClick={reset} className='bg-green-600 hover:bg-green-700'>
					Try Again
				</Button>
			</div>
		</div>
	);
}
