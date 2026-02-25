import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Target, Eye, Users, Award, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/shared/section';

export const metadata: Metadata = {
	title: 'About Us',
	description:
		"Learn about Tamohar Foundation's mission to transform villages through sustainable development in rural India.",
};

export default function AboutPage() {
	return (
		<>
			{/* Hero */}
			<section className='relative py-20 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=700&fit=crop'
						alt='About Tamohar Foundation'
						fill
						className='object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-green-900/85 to-green-800/70' />
				</div>
				<div className='relative container'>
					<div className='max-w-2xl space-y-4'>
						<h1 className='text-4xl md:text-5xl font-bold text-white'>
							About Tamohar Foundation
						</h1>
						<p className='text-lg text-green-100 leading-relaxed'>
							We are a village development organization committed to creating
							lasting, measurable impact in rural India through a data-driven,
							community-first approach.
						</p>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<Section>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Card className='border-l-4 border-l-green-500'>
						<CardContent className='pt-6'>
							<div className='flex items-center gap-3 mb-4'>
								<Target className='h-8 w-8 text-green-600' />
								<h2 className='text-2xl font-bold'>Our Mission</h2>
							</div>
							<p className='text-muted-foreground leading-relaxed'>
								To empower every village with access to quality healthcare,
								education, economic opportunities, and community-driven
								institutions so that no one is left behind in India&apos;s
								development journey.
							</p>
						</CardContent>
					</Card>
					<Card className='border-l-4 border-l-blue-500'>
						<CardContent className='pt-6'>
							<div className='flex items-center gap-3 mb-4'>
								<Eye className='h-8 w-8 text-blue-600' />
								<h2 className='text-2xl font-bold'>Our Vision</h2>
							</div>
							<p className='text-muted-foreground leading-relaxed'>
								A future where every village in India is self-sufficient,
								healthy, educated, and economically empowered — a future where
								villages don&apos;t just survive, but thrive.
							</p>
						</CardContent>
					</Card>
				</div>
			</Section>

			{/* Our Story */}
			<Section title='Our Story' className='bg-gray-50'>
				<div className='max-w-3xl space-y-4 text-muted-foreground leading-relaxed'>
					<p>
						Tamohar Foundation was born from a simple observation: while India
						races ahead in technology, finance, and urban development, millions
						in rural villages remain disconnected from basic services.
					</p>
					<p>
						We started in a single village with one health camp and one
						education center. Today, we operate across multiple villages,
						running programs in health, education, economy, employment, SHG
						formation, and government scheme awareness.
					</p>
					<p>
						What makes us different is our approach. Each village is treated as
						a module — a living system where we measure every input and outcome.
						Our digital platform tracks real metrics like patients treated,
						children enrolled, income increased, and savings accumulated.
					</p>
					<p>
						We believe in transparency, accountability, and community ownership.
						Our ultimate goal is to make ourselves unnecessary — by building
						villages that can sustain their own development.
					</p>
				</div>
			</Section>

			{/* Values */}
			<Section title='Our Values' centered>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
					{[
						{
							icon: <Heart className='h-6 w-6' />,
							title: 'Community First',
							desc: "Every decision starts with the community's needs, not our assumptions.",
							color: 'text-red-500 bg-red-50',
						},
						{
							icon: <Target className='h-6 w-6' />,
							title: 'Data-Driven',
							desc: "We measure everything. If it can't be measured, we find a way to measure it.",
							color: 'text-green-500 bg-green-50',
						},
						{
							icon: <Users className='h-6 w-6' />,
							title: 'Inclusive',
							desc: 'We work with women, youth, farmers, and the most marginalized communities.',
							color: 'text-purple-500 bg-purple-50',
						},
						{
							icon: <Globe className='h-6 w-6' />,
							title: 'Sustainable',
							desc: 'We build systems that outlast our programs — villages that run themselves.',
							color: 'text-blue-500 bg-blue-50',
						},
						{
							icon: <Eye className='h-6 w-6' />,
							title: 'Transparent',
							desc: 'Every rupee, every metric, every outcome is publicly shared and verified.',
							color: 'text-cyan-500 bg-cyan-50',
						},
						{
							icon: <Award className='h-6 w-6' />,
							title: 'Excellence',
							desc: "Rural doesn't mean low-quality. We deliver world-class programs in every village.",
							color: 'text-orange-500 bg-orange-50',
						},
					].map((value) => (
						<Card
							key={value.title}
							className='text-center hover:shadow-md transition-shadow'>
							<CardContent className='pt-6'>
								<div
									className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.color} mb-4`}>
									{value.icon}
								</div>
								<h3 className='font-semibold text-lg mb-2'>{value.title}</h3>
								<p className='text-sm text-muted-foreground'>{value.desc}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</Section>

			{/* CTA */}
			<section className='bg-green-600 py-16'>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold text-white mb-4'>
						Join Our Mission
					</h2>
					<p className='text-green-100 max-w-xl mx-auto mb-6'>
						Whether as a donor, CSR partner, or volunteer — there&apos;s a role
						for you in transforming villages.
					</p>
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-white text-green-800 hover:bg-gray-100'>
							<Link href='/donate'>Donate</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10'>
							<Link href='/csr'>CSR Partnership</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10'>
							<Link href='/contact'>Contact Us</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
