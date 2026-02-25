import type { Metadata } from 'next';
import { Section } from '@/components/shared/section';
import { EventCard } from '@/components/shared/event-card';
import { Badge } from '@/components/ui/badge';
import { events } from '@/lib/mock-data';

export const metadata: Metadata = {
	title: 'Events & Activities',
	description:
		'Health camps, farmer workshops, SHG melas, skill drives — explore all the events and activities organized by Tamohar Foundation.',
};

export default function EventsPage() {
	const upcoming = events.filter((e) => e.status === 'UPCOMING');
	const completed = events.filter((e) => e.status === 'COMPLETED');

	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-blue-50 to-cyan-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Events & Activities
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						From health camps to farmer workshops to SHG melas — see what&apos;s
						happening on the ground across our villages.
					</p>
				</div>
			</section>

			{/* Upcoming */}
			{upcoming.length > 0 && (
				<Section
					title='Upcoming Events'
					subtitle="Don't miss these upcoming activities.">
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{upcoming.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
				</Section>
			)}

			{/* Completed */}
			<Section
				title='Past Events'
				subtitle='A record of impact delivered on the ground.'
				className='bg-gray-50'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{completed.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</Section>
		</>
	);
}
