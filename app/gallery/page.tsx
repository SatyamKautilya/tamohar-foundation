import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/shared/section';

export const metadata: Metadata = {
	title: 'Gallery',
	description:
		"See the transformation in action. Photos and stories from Tamohar Foundation's village development work.",
};

const galleryImages = [
	{
		src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
		alt: 'Health camp in Rampur',
		caption: 'Free health camp — Rampur',
	},
	{
		src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
		alt: 'Children at Asha Learning Center',
		caption: 'Asha Learning Center — Sundarpur',
	},
	{
		src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
		alt: 'Farmer training workshop',
		caption: 'Farmer training — Govindgarh',
	},
	{
		src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
		alt: "SHG women's group meeting",
		caption: 'SHG mela — women entrepreneurs',
	},
	{
		src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
		alt: 'Skill development workshop',
		caption: 'Skill development drive',
	},
	{
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		alt: 'Village landscape panorama',
		caption: 'Village panorama — Rampur',
	},
	{
		src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
		alt: 'Green fields of hope',
		caption: 'Agricultural fields — Sundarpur',
	},
	{
		src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
		alt: 'Village development overview',
		caption: 'Village development — Govindgarh',
	},
	{
		src: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop',
		alt: 'Government scheme awareness camp',
		caption: 'Government scheme awareness camp',
	},
];

export default function GalleryPage() {
	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-purple-50 to-pink-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Stories in Pictures
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Every image tells a story of transformation. Browse through moments
						captured during our programs, events, and village visits.
					</p>
				</div>
			</section>

			{/* Gallery Grid */}
			<Section>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{galleryImages.map((img, index) => (
						<div
							key={index}
							className='group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer'>
							<Image
								src={img.src}
								alt={img.alt}
								fill
								className='object-cover group-hover:scale-110 transition-transform duration-500'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300' />
							<div className='absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
								<p className='text-white text-sm font-medium'>{img.caption}</p>
							</div>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}
