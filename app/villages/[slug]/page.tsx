import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
	MapPin,
	Users,
	Calendar,
	HeartPulse,
	GraduationCap,
	TrendingUp,
	Briefcase,
	ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Section } from '@/components/shared/section';
import { StatCard } from '@/components/shared/stat-card';
import { EventCard } from '@/components/shared/event-card';
import { ImpactBarChart } from '@/components/shared/impact-charts';
import { villages } from '@/lib/mock-data';
import { formatDate, formatNumber, getFocusAreaLabel } from '@/lib/utils';

interface PageProps {
	params: { slug: string };
}

function getVillage(slug: string) {
	return villages.find((v) => v.slug === slug);
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const village = getVillage(params.slug);
	if (!village) return { title: 'Village Not Found' };

	return {
		title: `${village.name} – Village Progress`,
		description: village.description,
		openGraph: {
			title: `${village.name} | Tamohar Foundation`,
			description: village.description,
			images: [{ url: village.heroImage }],
		},
	};
}

export function generateStaticParams() {
	return villages.map((v) => ({ slug: v.slug }));
}

export default function VillageDetailPage({ params }: PageProps) {
	const village = getVillage(params.slug);
	if (!village) notFound();

	const chartData = village.impactMetrics.map((m) => ({
		label: m.label,
		value: m.value,
		unit: m.unit,
	}));

	const totalBeneficiaries = village.programs.reduce(
		(sum, p) => sum + p.beneficiaryCount,
		0,
	);

	return (
		<>
			{/* ── HERO ── */}
			<section className='relative h-[50vh] min-h-[400px] flex items-end'>
				<Image
					src={village.heroImage}
					alt={village.name}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
				<div className='relative container pb-10 space-y-3'>
					<Badge className='bg-green-600/30 text-green-200 border-green-500/30'>
						Active Village
					</Badge>
					<h1 className='text-4xl md:text-5xl font-bold text-white'>
						{village.name}
					</h1>
					<div className='flex flex-wrap items-center gap-4 text-white/80 text-sm'>
						<span className='flex items-center'>
							<MapPin className='h-4 w-4 mr-1' />
							{village.district}, {village.state}
						</span>
						<span className='flex items-center'>
							<Users className='h-4 w-4 mr-1' />
							Population: {village.population?.toLocaleString('en-IN')}
						</span>
					</div>
				</div>
			</section>

			{/* ── QUICK STATS ── */}
			<section className='relative -mt-10 z-10'>
				<div className='container'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
						<StatCard
							label='Active Programs'
							value={village.programs.length}
							delay={0}
						/>
						<StatCard
							label='Beneficiaries'
							value={totalBeneficiaries}
							suffix='+'
							delay={100}
						/>
						<StatCard
							label='SHG Groups'
							value={village.shgs.length}
							delay={200}
						/>
						<StatCard
							label='Events Held'
							value={village.events.length}
							delay={300}
						/>
					</div>
				</div>
			</section>

			{/* ── OVERVIEW ── */}
			<Section title='Village Overview'>
				<p className='text-lg text-muted-foreground leading-relaxed max-w-3xl'>
					{village.description}
				</p>
			</Section>

			{/* ── PROGRAMS ── */}
			{village.programs.length > 0 && (
				<Section
					title='Programs Running'
					subtitle='Active development initiatives in this village.'
					className='bg-gray-50'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{village.programs.map((program) => (
							<Card
								key={program.id}
								className='hover:shadow-md transition-shadow'>
								<div className='relative h-40 overflow-hidden rounded-t-lg'>
									<Image
										src={program.thumbnail}
										alt={program.title}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 33vw'
									/>
								</div>
								<CardContent className='pt-4'>
									<Badge variant='secondary' className='mb-2 text-xs'>
										{getFocusAreaLabel(program.focusArea)}
									</Badge>
									<h3 className='font-semibold text-lg mb-1'>
										{program.title}
									</h3>
									<p className='text-sm text-muted-foreground line-clamp-2 mb-3'>
										{program.description}
									</p>
									<div className='flex items-center text-sm text-green-700 font-medium'>
										<Users className='h-4 w-4 mr-1' />
										{program.beneficiaryCount} beneficiaries
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Section>
			)}

			{/* ── IMPACT DASHBOARD ── */}
			{chartData.length > 0 && (
				<Section
					title='Impact Dashboard'
					subtitle='Measurable outcomes of our work in this village.'>
					<ImpactBarChart
						data={chartData}
						title={`${village.name} Impact Metrics`}
					/>
				</Section>
			)}

			{/* ── EVENTS ── */}
			{village.events.length > 0 && (
				<Section
					title='Events & Activities'
					subtitle='Past and upcoming events in this village.'
					className='bg-gray-50'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{village.events.map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>
				</Section>
			)}

			{/* ── SHGs ── */}
			{village.shgs.length > 0 && (
				<Section
					title='Self Help Groups'
					subtitle='Community-driven savings and enterprise groups.'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{village.shgs.map((shg) => (
							<Card key={shg.id} className='hover:shadow-md transition-shadow'>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<Badge variant='secondary'>{shg.category}</Badge>
										<Badge variant='success'>{shg.memberCount} members</Badge>
									</div>
									<CardTitle className='text-lg mt-2'>{shg.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-sm text-muted-foreground mb-4'>
										{shg.description}
									</p>
									<div className='grid grid-cols-2 gap-3'>
										<div className='bg-green-50 rounded-lg p-3 text-center'>
											<div className='text-lg font-bold text-green-700'>
												₹{formatNumber(shg.savingsTotal)}
											</div>
											<div className='text-xs text-muted-foreground'>
												Total Savings
											</div>
										</div>
										<div className='bg-blue-50 rounded-lg p-3 text-center'>
											<div className='text-lg font-bold text-blue-700'>
												₹{formatNumber(shg.loansDisbursed)}
											</div>
											<div className='text-xs text-muted-foreground'>
												Loans Disbursed
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Section>
			)}

			{/* ── CTA ── */}
			<section className='bg-green-600 py-16'>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold text-white mb-3'>
						Support {village.name}&apos;s Journey
					</h2>
					<p className='text-green-100 max-w-xl mx-auto mb-6'>
						Your contribution directly impacts real families in {village.name}.
						Every rupee creates measurable change.
					</p>
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-white text-green-800 hover:bg-gray-100'>
							<Link href='/donate'>Donate for {village.name}</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10'>
							<Link href='/contact'>Partner With Us</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
