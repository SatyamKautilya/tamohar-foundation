import Link from 'next/link';
import {
	MapPin,
	Calendar,
	Users,
	Image as ImageIcon,
	TrendingUp,
	ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { villages, events, shgs, programs, globalStats } from '@/lib/mock-data';

export default function AdminDashboard() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<p className='text-muted-foreground mt-1'>
					Overview of Tamohar Foundation&apos;s village development data.
				</p>
			</div>

			{/* Quick Stats */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{[
					{
						label: 'Villages',
						value: villages.length,
						icon: MapPin,
						color: 'text-green-600 bg-green-50',
						href: '/admin/villages',
					},
					{
						label: 'Events',
						value: events.length,
						icon: Calendar,
						color: 'text-blue-600 bg-blue-50',
						href: '/admin/events',
					},
					{
						label: 'SHGs',
						value: shgs.length,
						icon: Users,
						color: 'text-orange-600 bg-orange-50',
						href: '/admin/shgs',
					},
					{
						label: 'Programs',
						value: programs.length,
						icon: TrendingUp,
						color: 'text-purple-600 bg-purple-50',
						href: '/admin/villages',
					},
				].map((stat) => (
					<Card key={stat.label} className='hover:shadow-md transition-shadow'>
						<CardContent className='pt-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-muted-foreground'>{stat.label}</p>
									<p className='text-3xl font-bold mt-1'>{stat.value}</p>
								</div>
								<div
									className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.color}`}>
									<stat.icon className='h-6 w-6' />
								</div>
							</div>
							<Link
								href={stat.href}
								className='text-sm text-green-600 hover:underline mt-3 inline-flex items-center'>
								Manage <ArrowUpRight className='h-3 w-3 ml-1' />
							</Link>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-wrap gap-3'>
						<Button asChild className='bg-green-600 hover:bg-green-700'>
							<Link href='/admin/villages/new'>+ Add Village</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/admin/events/new'>+ Add Event</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/admin/shgs/new'>+ Add SHG</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link href='/admin/media'>Upload Media</Link>
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Recent Items */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Recent Villages */}
				<Card>
					<CardHeader>
						<CardTitle className='text-lg'>Villages</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{villages.map((v) => (
								<div
									key={v.id}
									className='flex items-center justify-between py-2 border-b last:border-0'>
									<div>
										<p className='font-medium'>{v.name}</p>
										<p className='text-xs text-muted-foreground'>
											{v.district}, {v.state} • Pop:{' '}
											{v.population?.toLocaleString()}
										</p>
									</div>
									<Button asChild variant='ghost' size='sm'>
										<Link href={`/admin/villages/${v.slug}`}>Edit</Link>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Recent Events */}
				<Card>
					<CardHeader>
						<CardTitle className='text-lg'>Recent Events</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{events.slice(0, 5).map((e) => (
								<div
									key={e.id}
									className='flex items-center justify-between py-2 border-b last:border-0'>
									<div>
										<p className='font-medium text-sm'>{e.title}</p>
										<p className='text-xs text-muted-foreground'>
											{e.villageName} •{' '}
											<span
												className={
													e.status === 'COMPLETED'
														? 'text-green-600'
														: 'text-blue-600'
												}>
												{e.status}
											</span>
										</p>
									</div>
									<Button asChild variant='ghost' size='sm'>
										<Link href={`/admin/events/${e.slug}`}>Edit</Link>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
