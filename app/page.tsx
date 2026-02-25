import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Heart,
	HeartPulse,
	GraduationCap,
	TrendingUp,
	Briefcase,
	Users,
	Landmark,
	MapPin,
	Calendar,
	Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/shared/section';
import { StatCard } from '@/components/shared/stat-card';
import { VillageCard } from '@/components/shared/village-card';
import { EventCard } from '@/components/shared/event-card';
import { siteConfig } from '@/lib/config';
import { villages, events, globalStats, programs } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Tamohar Foundation – Transforming Villages, Empowering Lives',
	description:
		'Tamohar Foundation drives sustainable village development through Health, Education, Economy, Employment, SHGs, and Government Scheme awareness in rural India.',
};

const focusIcons: Record<string, React.ReactNode> = {
	HEALTH: <HeartPulse className='h-8 w-8' />,
	EDUCATION: <GraduationCap className='h-8 w-8' />,
	ECONOMY: <TrendingUp className='h-8 w-8' />,
	EMPLOYMENT: <Briefcase className='h-8 w-8' />,
	SHG: <Users className='h-8 w-8' />,
	GOVERNMENT_SCHEMES: <Landmark className='h-8 w-8' />,
};

export default function HomePage() {
	const recentEvents = events.slice(0, 3);
	const featuredVillages = villages.slice(0, 3);

	return (
		<>
			{/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
			<section className='relative min-h-[85vh] flex items-center overflow-hidden'>
				{/* Background */}
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop'
						alt='Indian village landscape'
						fill
						className='object-cover'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30' />
				</div>

				<div className='relative container py-20'>
					<div className='max-w-2xl space-y-6'>
						<Badge className='bg-green-600/20 text-green-300 border-green-500/30 text-sm px-3 py-1'>
							🌱 Village Development Organization
						</Badge>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
							Transforming Villages.{' '}
							<span className='text-green-400'>Empowering Lives.</span>
						</h1>
						<p className='text-lg md:text-xl text-gray-200 leading-relaxed'>
							Tamohar Foundation is building a future where every village
							thrives through health, education, economic growth, and community
							empowerment.
						</p>
						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<Button
								asChild
								size='lg'
								className='bg-green-600 hover:bg-green-700 text-base'>
								<Link href='/villages'>
									Explore Our Impact
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-white/30 text-white hover:bg-white/10 text-base'>
								<Link href='/donate'>
									<Heart className='mr-2 h-4 w-4' />
									Support a Village
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════
          IMPACT STATISTICS
      ══════════════════════════════════════════════════════ */}
			<section className='relative -mt-16 z-10'>
				<div className='container'>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'>
						<StatCard
							label='Villages Impacted'
							value={globalStats.villagesImpacted}
							icon={<MapPin className='h-6 w-6' />}
							delay={0}
						/>
						<StatCard
							label='Lives Touched'
							value={globalStats.totalBeneficiaries}
							suffix='+'
							icon={<Users className='h-6 w-6' />}
							delay={100}
						/>
						<StatCard
							label='Active Programs'
							value={globalStats.programsRunning}
							icon={<Target className='h-6 w-6' />}
							delay={200}
						/>
						<StatCard
							label='SHGs Formed'
							value={globalStats.shgsFormed}
							icon={<Users className='h-6 w-6' />}
							delay={300}
						/>
						<StatCard
							label='Events Completed'
							value={globalStats.eventsCompleted}
							icon={<Calendar className='h-6 w-6' />}
							delay={400}
						/>
						<StatCard
							label='SHG Savings'
							value={globalStats.totalSavings}
							prefix='₹'
							icon={<TrendingUp className='h-6 w-6' />}
							delay={500}
						/>
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════
          FOCUS AREAS
      ══════════════════════════════════════════════════════ */}
			<Section
				title='Our Focus Areas'
				subtitle='We take a holistic approach to village development, addressing the most critical pillars of rural transformation.'
				centered
				className='bg-gray-50'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{siteConfig.focusAreas.map((area) => (
						<Card
							key={area.key}
							className='hover:shadow-md transition-shadow group cursor-pointer'>
							<CardContent className='pt-6'>
								<div
									className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${area.bgColor} ${area.color} mb-4 group-hover:scale-110 transition-transform`}>
									{focusIcons[area.key]}
								</div>
								<h3 className='text-xl font-semibold mb-2'>{area.title}</h3>
								<p className='text-sm text-muted-foreground leading-relaxed'>
									{area.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
				<div className='text-center mt-8'>
					<Button asChild variant='outline'>
						<Link href='/focus-areas'>
							Learn More About Our Work
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</div>
			</Section>

			{/* ══════════════════════════════════════════════════════
          FEATURED VILLAGES
      ══════════════════════════════════════════════════════ */}
			<Section
				title='Villages We Transform'
				subtitle='Each village is a story of progress. Explore real impact data, programs, and community stories.'
				centered>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{featuredVillages.map((village) => (
						<VillageCard key={village.id} village={village} />
					))}
				</div>
				<div className='text-center mt-8'>
					<Button asChild variant='outline'>
						<Link href='/villages'>
							View All Villages
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</div>
			</Section>

			{/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
			<Section
				title='How We Create Impact'
				subtitle='A transparent, data-driven approach to village transformation.'
				centered
				className='bg-green-50'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
					{[
						{
							step: '01',
							title: 'Identify',
							desc: 'We survey villages to understand problems in health, education, economy, and governance.',
						},
						{
							step: '02',
							title: 'Intervene',
							desc: 'We run targeted programs—health camps, learning centers, SHGs, skill training, and scheme awareness.',
						},
						{
							step: '03',
							title: 'Measure',
							desc: 'We track every metric—lives touched, income changes, literacy gains—and share it transparently.',
						},
					].map((item) => (
						<div key={item.step} className='text-center'>
							<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold mb-4'>
								{item.step}
							</div>
							<h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
							<p className='text-sm text-muted-foreground'>{item.desc}</p>
						</div>
					))}
				</div>
			</Section>

			{/* ══════════════════════════════════════════════════════
          RECENT EVENTS
      ══════════════════════════════════════════════════════ */}
			<Section
				title='Recent Events & Activities'
				subtitle="From health camps to farmer workshops, see what's happening on the ground."
				centered>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{recentEvents.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
				<div className='text-center mt-8'>
					<Button asChild variant='outline'>
						<Link href='/events'>
							View All Events
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</div>
			</Section>

			{/* ══════════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════════ */}
			<section className='relative py-20 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=600&fit=crop'
						alt='Rural India'
						fill
						className='object-cover'
					/>
					<div className='absolute inset-0 bg-green-900/80' />
				</div>
				<div className='relative container text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
						Be Part of the Transformation
					</h2>
					<p className='text-lg text-green-100 max-w-2xl mx-auto mb-8'>
						Whether you donate, partner, or volunteer — every contribution
						creates measurable impact in a real village.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-white text-green-800 hover:bg-gray-100 text-base'>
							<Link href='/donate'>
								<Heart className='mr-2 h-4 w-4' />
								Donate Now
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10 text-base'>
							<Link href='/csr'>CSR Partnership →</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10 text-base'>
							<Link href='/contact'>Contact Us →</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
