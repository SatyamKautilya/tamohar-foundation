import type { Metadata } from 'next';
import Link from 'next/link';
import {
	Heart,
	Shield,
	FileText,
	IndianRupee,
	CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/shared/section';

export const metadata: Metadata = {
	title: 'Donate',
	description:
		"Support Tamohar Foundation's mission. Every donation directly funds health camps, education, SHGs, and village development programs.",
};

const donationTiers = [
	{
		amount: 500,
		label: '₹500',
		impact: 'Provides school supplies for 5 children for a month',
	},
	{
		amount: 1000,
		label: '₹1,000',
		impact: 'Funds one health checkup camp in a village',
	},
	{
		amount: 2500,
		label: '₹2,500',
		impact: 'Supports a farmer training workshop for 10 farmers',
	},
	{
		amount: 5000,
		label: '₹5,000',
		impact: 'Seeds a new Self Help Group with operational support',
	},
	{
		amount: 10000,
		label: '₹10,000',
		impact: 'Runs an Asha Learning Center for a month',
	},
	{
		amount: 25000,
		label: '₹25,000',
		impact: 'Sponsors a complete health camp with medicine distribution',
	},
];

export default function DonatePage() {
	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-green-600 to-emerald-700 py-20'>
				<div className='container text-center'>
					<Heart className='h-16 w-16 text-white/80 mx-auto mb-4' />
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						Transform a Village Today
					</h1>
					<p className='text-lg text-green-100 max-w-2xl mx-auto'>
						Every rupee you donate creates measurable, traceable impact in a
						real village. No overhead, no ambiguity — just direct
						transformation.
					</p>
				</div>
			</section>

			{/* Donation Tiers */}
			<Section
				title='Choose Your Impact'
				subtitle='Select an amount and see exactly what your donation achieves.'
				centered>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto'>
					{donationTiers.map((tier) => (
						<Card
							key={tier.amount}
							className='hover:shadow-lg hover:border-green-300 transition-all cursor-pointer group'>
							<CardContent className='pt-6 text-center'>
								<div className='text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform'>
									{tier.label}
								</div>
								<p className='text-sm text-muted-foreground'>{tier.impact}</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className='max-w-md mx-auto mt-8'>
					<Card>
						<CardContent className='pt-6'>
							<label className='text-sm font-medium mb-2 block text-center'>
								Or enter a custom amount
							</label>
							<div className='flex gap-2'>
								<div className='relative flex-1'>
									<IndianRupee className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
									<Input
										type='number'
										placeholder='Enter amount'
										className='pl-9'
										min={100}
									/>
								</div>
								<Button className='bg-green-600 hover:bg-green-700'>
									Donate
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</Section>

			{/* Trust Section */}
			<Section className='bg-gray-50' centered>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
					<div className='text-center space-y-2'>
						<Shield className='h-10 w-10 text-green-600 mx-auto' />
						<h3 className='font-semibold'>100% Secure</h3>
						<p className='text-sm text-muted-foreground'>
							All transactions are encrypted and secure.
						</p>
					</div>
					<div className='text-center space-y-2'>
						<FileText className='h-10 w-10 text-green-600 mx-auto' />
						<h3 className='font-semibold'>Tax Deductible</h3>
						<p className='text-sm text-muted-foreground'>
							Donations eligible for 80G tax benefits.
						</p>
					</div>
					<div className='text-center space-y-2'>
						<CheckCircle className='h-10 w-10 text-green-600 mx-auto' />
						<h3 className='font-semibold'>Full Transparency</h3>
						<p className='text-sm text-muted-foreground'>
							Track exactly where your money goes.
						</p>
					</div>
				</div>
			</Section>

			{/* FAQ */}
			<Section title='Frequently Asked Questions' centered>
				<div className='max-w-2xl mx-auto space-y-4'>
					{[
						{
							q: 'Is my donation tax-deductible?',
							a: 'Yes. Tamohar Foundation is registered under Section 80G, and all donations are eligible for tax deduction.',
						},
						{
							q: 'How is my money used?',
							a: 'Your donation directly funds village programs — health camps, learning centers, SHG formation, farmer training, and skill development. We publish detailed utilization reports.',
						},
						{
							q: 'Can I donate for a specific village?',
							a: "Yes. You can specify which village or program you want to support, and we'll ensure your donation goes directly there.",
						},
						{
							q: 'Can I set up recurring donations?',
							a: 'Recurring giving is coming soon. Meanwhile, you can donate anytime through our platform.',
						},
					].map((faq, i) => (
						<Card key={i}>
							<CardContent className='pt-4'>
								<h3 className='font-semibold mb-1'>{faq.q}</h3>
								<p className='text-sm text-muted-foreground'>{faq.a}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</Section>
		</>
	);
}
