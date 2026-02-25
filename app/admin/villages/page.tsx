import Link from 'next/link';
import { MapPin, Users, Plus, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { villages } from '@/lib/mock-data';

export default function AdminVillagesPage() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>Manage Villages</h1>
					<p className='text-muted-foreground text-sm mt-1'>
						Create, edit, and manage village profiles.
					</p>
				</div>
				<Button asChild className='bg-green-600 hover:bg-green-700'>
					<Link href='/admin/villages/new'>
						<Plus className='h-4 w-4 mr-2' />
						Add Village
					</Link>
				</Button>
			</div>

			{/* Village List */}
			<div className='space-y-4'>
				{villages.map((village) => (
					<Card key={village.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
								<div className='space-y-1'>
									<div className='flex items-center gap-2'>
										<h3 className='text-lg font-semibold'>{village.name}</h3>
										<Badge variant={village.isActive ? 'success' : 'secondary'}>
											{village.isActive ? 'Active' : 'Inactive'}
										</Badge>
									</div>
									<div className='flex items-center gap-4 text-sm text-muted-foreground'>
										<span className='flex items-center'>
											<MapPin className='h-3.5 w-3.5 mr-1' />
											{village.district}, {village.state}
										</span>
										<span className='flex items-center'>
											<Users className='h-3.5 w-3.5 mr-1' />
											Pop: {village.population?.toLocaleString()}
										</span>
									</div>
									<div className='flex gap-2 mt-2'>
										<Badge variant='secondary'>
											{village.programs.length} programs
										</Badge>
										<Badge variant='secondary'>
											{village.events.length} events
										</Badge>
										<Badge variant='secondary'>
											{village.shgs.length} SHGs
										</Badge>
									</div>
								</div>
								<div className='flex gap-2'>
									<Button asChild variant='outline' size='sm'>
										<Link href={`/villages/${village.slug}`}>View</Link>
									</Button>
									<Button asChild size='sm'>
										<Link href={`/admin/villages/${village.slug}`}>
											<Edit className='h-3.5 w-3.5 mr-1' />
											Edit
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
