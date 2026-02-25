import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
			<div className='text-center max-w-md'>
				<h1 className='text-7xl font-bold text-green-600 mb-2'>404</h1>
				<h2 className='text-2xl font-bold mb-2'>Page Not Found</h2>
				<p className='text-muted-foreground mb-6 text-sm'>
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<Button asChild className='bg-green-600 hover:bg-green-700'>
					<Link href='/'>
						<Home className='h-4 w-4 mr-2' />
						Back to Home
					</Link>
				</Button>
			</div>
		</div>
	);
}
