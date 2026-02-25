import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/shared/section';
import { events } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

interface PageProps {
	params: { slug: string };
}

function getEvent(slug: string) {
	return events.find((e) => e.slug === slug);
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const event = getEvent(params.slug);
	if (!event) return { title: 'Event Not Found' };

	return {
		title: event.title,
		description: event.description,
		openGraph: {
			title: `${event.title} | Tamohar Foundation`,
			description: event.description,
			images: [{ url: event.heroImage }],
		},
	};
}

export function generateStaticParams() {
	return events.map((e) => ({ slug: e.slug }));
}

const statusStyles: Record<string, string> = {
	UPCOMING: 'bg-blue-100 text-blue-700',
	ONGOING: 'bg-yellow-100 text-yellow-700',
	COMPLETED: 'bg-green-100 text-green-700',
	CANCELLED: 'bg-red-100 text-red-700',
};

export default function EventDetailPage({ params }: PageProps) {
	const event = getEvent(params.slug);
	if (!event) notFound();

	return (
		<>
			{/* Hero */}
			<section className='relative h-[45vh] min-h-[350px] flex items-end'>
				<Image
					src={event.heroImage}
					alt={event.title}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
				<div className='relative container pb-10 space-y-3'>
					<Badge
						className={`${
							statusStyles[event.status] || 'bg-gray-100 text-gray-700'
						} border-0`}>
						{event.status}
					</Badge>
					<h1 className='text-3xl md:text-4xl font-bold text-white'>
						{event.title}
					</h1>
					<div className='flex flex-wrap items-center gap-4 text-white/80 text-sm'>
						<span className='flex items-center'>
							<Calendar className='h-4 w-4 mr-1' />
							{formatDate(event.date)}
						</span>
						{event.location && (
							<span className='flex items-center'>
								<MapPin className='h-4 w-4 mr-1' />
								{event.location}
							</span>
						)}
						<span className='flex items-center'>
							<Users className='h-4 w-4 mr-1' />
							{event.beneficiaryCount} beneficiaries
						</span>
					</div>
				</div>
			</section>

			{/* Content */}
			<Section>
				<div className='max-w-3xl'>
					<Button asChild variant='ghost' size='sm' className='mb-6'>
						<Link href='/events'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Back to Events
						</Link>
					</Button>

					<div className='prose prose-lg max-w-none'>
						<p className='text-lg text-muted-foreground leading-relaxed'>
							{event.description}
						</p>
					</div>

					{/* Event Details Card */}
					<div className='mt-8 bg-gray-50 rounded-xl p-6 space-y-4'>
						<h3 className='font-semibold text-lg'>Event Details</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<div className='text-sm text-muted-foreground'>Date</div>
								<div className='font-medium'>{formatDate(event.date)}</div>
							</div>
							<div>
								<div className='text-sm text-muted-foreground'>Location</div>
								<div className='font-medium'>{event.location}</div>
							</div>
							<div>
								<div className='text-sm text-muted-foreground'>
									Beneficiaries
								</div>
								<div className='font-medium'>
									{event.beneficiaryCount} people
								</div>
							</div>
							<div>
								<div className='text-sm text-muted-foreground'>Village</div>
								<Link
									href={`/villages/${event.villageName?.toLowerCase()}`}
									className='font-medium text-green-600 hover:underline'>
									{event.villageName}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* CTA */}
			<section className='bg-green-50 py-12'>
				<div className='container text-center'>
					<h2 className='text-2xl font-bold text-gray-900 mb-3'>
						Want to Support Events Like This?
					</h2>
					<p className='text-muted-foreground mb-6'>
						Your contributions help us organize more health camps, training
						workshops, and community events.
					</p>
					<div className='flex gap-3 justify-center'>
						<Button asChild className='bg-green-600 hover:bg-green-700'>
							<Link href='/donate'>Donate Now</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/contact'>Get Involved</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
