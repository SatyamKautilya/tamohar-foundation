import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, IndianRupee, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/shared/section';
import { StatCard } from '@/components/shared/stat-card';
import { shgs } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Self Help Groups (SHG)',
	description:
		'Discover how Tamohar Foundation empowers communities through Self Help Groups — collective savings, micro-lending, and women-led enterprises.',
};

export default function SHGPage() {
	const totalMembers = shgs.reduce((sum, s) => sum + s.memberCount, 0);
	const totalSavings = shgs.reduce((sum, s) => sum + s.savingsTotal, 0);
	const totalLoans = shgs.reduce((sum, s) => sum + s.loansDisbursed, 0);

	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-orange-50 to-amber-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Self Help Groups
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Empowering communities through collective savings, micro-lending,
						and women-led enterprises. Our SHGs are the backbone of village
						economic transformation.
					</p>
				</div>
			</section>

			{/* Stats */}
			<section className='relative -mt-6 z-10'>
				<div className='container'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<StatCard
							label='Total SHGs'
							value={shgs.length}
							icon={<Users className='h-6 w-6' />}
						/>
						<StatCard
							label='Total Members'
							value={totalMembers}
							icon={<Users className='h-6 w-6' />}
							delay={100}
						/>
						<StatCard
							label='Total Savings'
							value={totalSavings}
							prefix='₹'
							icon={<IndianRupee className='h-6 w-6' />}
							delay={200}
						/>
						<StatCard
							label='Loans Disbursed'
							value={totalLoans}
							prefix='₹'
							icon={<TrendingUp className='h-6 w-6' />}
							delay={300}
						/>
					</div>
				</div>
			</section>

			{/* SHG List */}
			<Section
				title='Our Self Help Groups'
				subtitle='Each group is a micro-engine of economic empowerment.'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{shgs.map((shg) => (
						<Card
							key={shg.id}
							className='hover:shadow-lg transition-all duration-300'>
							<CardHeader>
								<div className='flex items-center justify-between mb-2'>
									<Badge variant='secondary'>{shg.category}</Badge>
									<Badge variant='success'>{shg.memberCount} members</Badge>
								</div>
								<CardTitle className='text-xl'>{shg.name}</CardTitle>
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
										<div className='text-xs text-muted-foreground'>Savings</div>
									</div>
									<div className='bg-blue-50 rounded-lg p-3 text-center'>
										<div className='text-lg font-bold text-blue-700'>
											₹{formatNumber(shg.loansDisbursed)}
										</div>
										<div className='text-xs text-muted-foreground'>Loans</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Section>

			{/* How SHGs Work */}
			<Section
				title='How SHGs Work'
				subtitle='A simple yet powerful model for community empowerment.'
				centered
				className='bg-orange-50'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
					{[
						{
							step: '1',
							title: 'Form',
							desc: '10-20 members form a group with shared goals and regular meetings.',
						},
						{
							step: '2',
							title: 'Save',
							desc: 'Members contribute small monthly savings, building a collective corpus.',
						},
						{
							step: '3',
							title: 'Lend',
							desc: 'The group provides micro-loans to members for emergencies and enterprise.',
						},
						{
							step: '4',
							title: 'Grow',
							desc: 'Members start businesses, gain confidence, and achieve financial independence.',
						},
					].map((item) => (
						<div key={item.step} className='text-center'>
							<div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-500 text-white text-xl font-bold mb-3'>
								{item.step}
							</div>
							<h3 className='font-semibold text-lg mb-1'>{item.title}</h3>
							<p className='text-sm text-muted-foreground'>{item.desc}</p>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}
