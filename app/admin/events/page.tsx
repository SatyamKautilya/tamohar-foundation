import Link from 'next/link';
import { Calendar, Users, Plus, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { events } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
	UPCOMING: 'bg-blue-100 text-blue-700',
	ONGOING: 'bg-yellow-100 text-yellow-700',
	COMPLETED: 'bg-green-100 text-green-700',
	CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminEventsPage() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>Manage Events</h1>
					<p className='text-muted-foreground text-sm mt-1'>
						Create, edit, and manage events and activities.
					</p>
				</div>
				<Button asChild className='bg-green-600 hover:bg-green-700'>
					<Link href='/admin/events/new'>
						<Plus className='h-4 w-4 mr-2' />
						Add Event
					</Link>
				</Button>
			</div>

			<div className='space-y-3'>
				{events.map((event) => (
					<Card key={event.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
								<div className='space-y-1'>
									<div className='flex items-center gap-2'>
										<h3 className='font-semibold'>{event.title}</h3>
										<span
											className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
												statusColors[event.status] || ''
											}`}>
											{event.status}
										</span>
									</div>
									<div className='flex items-center gap-4 text-sm text-muted-foreground'>
										<span className='flex items-center'>
											<Calendar className='h-3.5 w-3.5 mr-1' />
											{formatDate(event.date)}
										</span>
										<span className='flex items-center'>
											<Users className='h-3.5 w-3.5 mr-1' />
											{event.beneficiaryCount} beneficiaries
										</span>
										<span>{event.villageName}</span>
									</div>
								</div>
								<div className='flex gap-2'>
									<Button asChild variant='outline' size='sm'>
										<Link href={`/events/${event.slug}`}>View</Link>
									</Button>
									<Button asChild size='sm'>
										<Link href={`/admin/events/${event.slug}`}>
											<Edit className='h-3.5 w-3.5 mr-1' />
											Edit
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
