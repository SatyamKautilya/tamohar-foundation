import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VillageCardProps {
	village: {
		name: string;
		slug: string;
		description: string;
		state: string;
		district: string;
		population: number;
		thumbnail: string;
		programs?: { focusArea: string }[];
	};
}

export function VillageCard({ village }: VillageCardProps) {
	const focusAreas = village.programs
		? [...new Set(village.programs.map((p) => p.focusArea))]
		: [];

	return (
		<Card className='overflow-hidden group hover:shadow-lg transition-all duration-300'>
			<div className='relative h-48 overflow-hidden'>
				<Image
					src={village.thumbnail}
					alt={village.name}
					fill
					className='object-cover group-hover:scale-105 transition-transform duration-500'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
				<div className='absolute bottom-3 left-3'>
					<h3 className='text-xl font-bold text-white'>{village.name}</h3>
					<div className='flex items-center text-white/80 text-sm mt-0.5'>
						<MapPin className='h-3.5 w-3.5 mr-1' />
						{village.district}, {village.state}
					</div>
				</div>
			</div>
			<CardContent className='pt-4'>
				<div className='flex items-center text-sm text-muted-foreground mb-3'>
					<Users className='h-4 w-4 mr-1.5' />
					Population: {village.population?.toLocaleString('en-IN')}
				</div>
				<p className='text-sm text-muted-foreground line-clamp-2 mb-3'>
					{village.description}
				</p>
				{focusAreas.length > 0 && (
					<div className='flex flex-wrap gap-1.5 mb-4'>
						{focusAreas.slice(0, 3).map((area) => (
							<Badge key={area} variant='secondary' className='text-xs'>
								{area.replace('_', ' ')}
							</Badge>
						))}
					</div>
				)}
				<Button asChild variant='outline' size='sm' className='w-full'>
					<Link href={`/villages/${village.slug}`}>
						View Village Progress →
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
