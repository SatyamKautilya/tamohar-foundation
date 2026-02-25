import type { Metadata } from 'next';
import { Section } from '@/components/shared/section';
import { VillageCard } from '@/components/shared/village-card';
import { villages } from '@/lib/mock-data';

export const metadata: Metadata = {
	title: 'Our Villages',
	description:
		'Explore the villages where Tamohar Foundation drives measurable impact through health, education, economic, and community programs.',
};

export default function VillagesPage() {
	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-green-50 to-emerald-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Our Villages
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Each village is a living module of transformation. Track real
						progress, active programs, and community impact across every village
						we serve.
					</p>
				</div>
			</section>

			{/* Village Grid */}
			<Section>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{villages.map((village) => (
						<VillageCard key={village.id} village={village} />
					))}
				</div>
				{villages.length === 0 && (
					<div className='text-center py-20 text-muted-foreground'>
						<p className='text-lg'>No villages available yet.</p>
						<p className='text-sm mt-2'>Check back soon for updates.</p>
					</div>
				)}
			</Section>
		</>
	);
}
