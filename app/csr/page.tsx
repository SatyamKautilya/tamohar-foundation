import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
	Building2,
	BarChart3,
	Users,
	Award,
	ArrowRight,
	CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/shared/section';
import { globalStats } from '@/lib/mock-data';

export const metadata: Metadata = {
	title: 'CSR Partnership',
	description:
		'Partner with Tamohar Foundation for your CSR initiatives. We deliver measurable, transparent impact in rural India.',
};

export default function CSRPage() {
	return (
		<>
			{/* Hero */}
			<section className='relative py-20 overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=700&fit=crop'
						alt='Partnership'
						fill
						className='object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/70' />
				</div>
				<div className='relative container'>
					<div className='max-w-2xl space-y-4'>
						<h1 className='text-4xl md:text-5xl font-bold text-white'>
							CSR Partnership
						</h1>
						<p className='text-lg text-blue-100 leading-relaxed'>
							Partner with Tamohar Foundation to create measurable, sustainable
							impact under your CSR mandate. We offer complete transparency,
							data-driven reporting, and real village transformation.
						</p>
						<Button
							asChild
							size='lg'
							className='bg-white text-blue-800 hover:bg-gray-100'>
							<Link href='/contact'>
								Start a Conversation
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Why Partner */}
			<Section
				title='Why Partner With Us?'
				subtitle="We don't just spend CSR funds — we invest them in measurable village outcomes."
				centered>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{[
						{
							icon: <BarChart3 className='h-8 w-8' />,
							title: 'Data-Driven Impact',
							desc: 'Every program has measurable KPIs. We provide detailed reports with real metrics.',
							color: 'text-blue-500 bg-blue-50',
						},
						{
							icon: <Building2 className='h-8 w-8' />,
							title: 'Compliance Ready',
							desc: 'Full 80G certification, audited financials, and CSR compliance documentation.',
							color: 'text-green-500 bg-green-50',
						},
						{
							icon: <Users className='h-8 w-8' />,
							title: 'Community Ownership',
							desc: 'Programs are designed for community take-over, ensuring long-term sustainability.',
							color: 'text-purple-500 bg-purple-50',
						},
						{
							icon: <Award className='h-8 w-8' />,
							title: 'Brand Association',
							desc: 'Your brand associated with real stories of transformation and community upliftment.',
							color: 'text-orange-500 bg-orange-50',
						},
					].map((item) => (
						<Card
							key={item.title}
							className='text-center hover:shadow-md transition-shadow'>
							<CardContent className='pt-6'>
								<div
									className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.color} mb-4`}>
									{item.icon}
								</div>
								<h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
								<p className='text-sm text-muted-foreground'>{item.desc}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</Section>

			{/* Partnership Models */}
			<Section
				title='Partnership Models'
				subtitle='Flexible engagement models designed for impact.'
				centered
				className='bg-gray-50'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
					{[
						{
							title: 'Village Adoption',
							desc: 'Adopt an entire village. Your CSR funds all programs — health, education, economy, SHGs — in one village for a defined period.',
							features: [
								'Complete village transformation',
								'Your brand visibility',
								'Regular impact reports',
								'Site visits & engagement',
							],
						},
						{
							title: 'Program Sponsorship',
							desc: 'Sponsor a specific program like health camps, learning centers, or SHG formation across multiple villages.',
							features: [
								'Focus on your priority area',
								'Scalable across villages',
								'Program-specific metrics',
								'Annual review & reporting',
							],
						},
						{
							title: 'Event Sponsorship',
							desc: 'Sponsor specific events like health drives, skill workshops, or SHG melas with direct visibility and engagement.',
							features: [
								'High visibility events',
								'Employee volunteering',
								'Media coverage',
								'Immediate, tangible impact',
							],
						},
					].map((model) => (
						<Card
							key={model.title}
							className='hover:shadow-lg transition-shadow'>
							<CardContent className='pt-6'>
								<h3 className='text-xl font-bold mb-3'>{model.title}</h3>
								<p className='text-sm text-muted-foreground mb-4'>
									{model.desc}
								</p>
								<ul className='space-y-2'>
									{model.features.map((f) => (
										<li key={f} className='flex items-start gap-2 text-sm'>
											<CheckCircle className='h-4 w-4 text-green-500 mt-0.5 shrink-0' />
											<span>{f}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</Section>

			{/* CTA */}
			<section className='bg-blue-600 py-16'>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold text-white mb-4'>
						Ready to Create Impact Together?
					</h2>
					<p className='text-blue-100 max-w-xl mx-auto mb-6'>
						Let&apos;s discuss how your CSR goals align with our village
						development mission. We&apos;ll design a custom partnership plan for
						your organization.
					</p>
					<div className='flex flex-col sm:flex-row gap-3 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-white text-blue-800 hover:bg-gray-100'>
							<Link href='/contact'>Contact Our CSR Team</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-white/40 text-white hover:bg-white/10'>
							<Link href='/about'>Learn About Us</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
