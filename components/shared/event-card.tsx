import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
	event: {
		title: string;
		slug: string;
		description: string;
		date: string;
		location: string;
		status: string;
		beneficiaryCount: number;
		heroImage: string;
		villageName?: string;
	};
}

const statusColors: Record<string, string> = {
	UPCOMING: 'bg-blue-100 text-blue-700',
	ONGOING: 'bg-yellow-100 text-yellow-700',
	COMPLETED: 'bg-green-100 text-green-700',
	CANCELLED: 'bg-red-100 text-red-700',
};

export function EventCard({ event }: EventCardProps) {
	return (
		<Card className='overflow-hidden group hover:shadow-lg transition-all duration-300'>
			<div className='relative h-44 overflow-hidden'>
				<Image
					src={event.heroImage}
					alt={event.title}
					fill
					className='object-cover group-hover:scale-105 transition-transform duration-500'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
				<div className='absolute top-3 right-3'>
					<span
						className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
							statusColors[event.status] || 'bg-gray-100 text-gray-700'
						}`}>
						{event.status}
					</span>
				</div>
			</div>
			<CardContent className='pt-4'>
				<h3 className='font-semibold text-lg leading-tight mb-2 line-clamp-2'>
					{event.title}
				</h3>
				<div className='space-y-1.5 text-sm text-muted-foreground mb-3'>
					<div className='flex items-center'>
						<Calendar className='h-3.5 w-3.5 mr-1.5 shrink-0' />
						{formatDate(event.date)}
					</div>
					{event.location && (
						<div className='flex items-center'>
							<MapPin className='h-3.5 w-3.5 mr-1.5 shrink-0' />
							{event.location}
						</div>
					)}
					<div className='flex items-center'>
						<Users className='h-3.5 w-3.5 mr-1.5 shrink-0' />
						{event.beneficiaryCount} beneficiaries
					</div>
				</div>
				<p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
					{event.description}
				</p>
				<Button asChild variant='outline' size='sm' className='w-full'>
					<Link href={`/events/${event.slug}`}>View Details →</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
