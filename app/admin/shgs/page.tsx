import Link from 'next/link';
import { Users, Plus, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { shgs } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

export default function AdminSHGsPage() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>Manage SHGs</h1>
					<p className='text-muted-foreground text-sm mt-1'>
						Create, edit, and manage Self Help Groups.
					</p>
				</div>
				<Button asChild className='bg-green-600 hover:bg-green-700'>
					<Link href='/admin/shgs/new'>
						<Plus className='h-4 w-4 mr-2' />
						Add SHG
					</Link>
				</Button>
			</div>

			<div className='space-y-3'>
				{shgs.map((shg) => (
					<Card key={shg.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
								<div className='space-y-1'>
									<div className='flex items-center gap-2'>
										<h3 className='font-semibold'>{shg.name}</h3>
										<Badge variant='secondary'>{shg.category}</Badge>
										<Badge variant={shg.isActive ? 'success' : 'secondary'}>
											{shg.isActive ? 'Active' : 'Inactive'}
										</Badge>
									</div>
									<div className='flex items-center gap-4 text-sm text-muted-foreground'>
										<span className='flex items-center'>
											<Users className='h-3.5 w-3.5 mr-1' />
											{shg.memberCount} members
										</span>
										<span>Savings: ₹{formatNumber(shg.savingsTotal)}</span>
										<span>Loans: ₹{formatNumber(shg.loansDisbursed)}</span>
									</div>
								</div>
								<Button asChild size='sm'>
									<Link href={`/admin/shgs/${shg.slug}`}>
										<Edit className='h-3.5 w-3.5 mr-1' />
										Edit
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
