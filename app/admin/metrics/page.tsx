import Link from 'next/link';
import { BarChart3, Plus, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { impactMetrics } from '@/lib/mock-data';
import { getFocusAreaLabel, formatNumber } from '@/lib/utils';

export default function AdminMetricsPage() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>Impact Metrics</h1>
					<p className='text-muted-foreground text-sm mt-1'>
						Manage measurable impact data for villages.
					</p>
				</div>
			</div>

			{/* Add Metric Form */}
			<Card>
				<CardContent className='pt-6'>
					<h3 className='font-semibold mb-4'>Add New Metric</h3>
					<form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end'>
						<div>
							<label className='text-xs font-medium mb-1 block'>Label *</label>
							<Input placeholder='e.g., Children Educated' />
						</div>
						<div>
							<label className='text-xs font-medium mb-1 block'>Value *</label>
							<Input type='number' placeholder='350' />
						</div>
						<div>
							<label className='text-xs font-medium mb-1 block'>Unit</label>
							<Input placeholder='e.g., people, %, ₹' />
						</div>
						<div>
							<label className='text-xs font-medium mb-1 block'>Category</label>
							<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
								<option value='HEALTH'>Health</option>
								<option value='EDUCATION'>Education</option>
								<option value='ECONOMY'>Economy</option>
								<option value='EMPLOYMENT'>Employment</option>
								<option value='SHG'>SHG</option>
								<option value='GOVERNMENT_SCHEMES'>Gov. Schemes</option>
							</select>
						</div>
						<Button type='submit' className='bg-green-600 hover:bg-green-700'>
							<Plus className='h-4 w-4 mr-1' />
							Add
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Metrics List */}
			<div className='space-y-3'>
				{impactMetrics.map((metric) => (
					<Card key={metric.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='pt-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<BarChart3 className='h-5 w-5 text-green-600' />
									<div>
										<p className='font-medium'>{metric.label}</p>
										<div className='flex items-center gap-2 mt-0.5'>
											<span className='text-lg font-bold text-green-700'>
												{metric.unit === '₹' ? '₹' : ''}
												{formatNumber(metric.value)}
												{metric.unit && metric.unit !== '₹'
													? ` ${metric.unit}`
													: ''}
											</span>
											<Badge variant='secondary' className='text-xs'>
												{getFocusAreaLabel(metric.category)}
											</Badge>
										</div>
									</div>
								</div>
								<Button variant='ghost' size='sm'>
									<Edit className='h-3.5 w-3.5' />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
