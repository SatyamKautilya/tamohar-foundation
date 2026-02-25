import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export default function NewSHGPage() {
	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h1 className='text-2xl font-bold'>Add New SHG</h1>
				<p className='text-muted-foreground text-sm mt-1'>
					Create a new Self Help Group.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>SHG Details</CardTitle>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Name *
								</label>
								<Input placeholder='e.g., Lakshmi Mahila Mandal' required />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Slug *
								</label>
								<Input placeholder='e.g., lakshmi-mahila-mandal' required />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Category
								</label>
								<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
									<option value='Women'>Women</option>
									<option value='Youth'>Youth</option>
									<option value='Farmer'>Farmer</option>
									<option value='Mixed'>Mixed</option>
								</select>
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Member Count
								</label>
								<Input type='number' placeholder='10' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Village
								</label>
								<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
									<option value=''>Select Village</option>
									<option value='v1'>Rampur</option>
									<option value='v2'>Sundarpur</option>
									<option value='v3'>Govindgarh</option>
								</select>
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Total Savings (₹)
								</label>
								<Input type='number' placeholder='0' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Loans Disbursed (₹)
								</label>
								<Input type='number' placeholder='0' />
							</div>
						</div>

						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Description
							</label>
							<Textarea
								placeholder='Describe the SHG and its activities...'
								rows={4}
							/>
						</div>

						<div className='pt-4 flex gap-3'>
							<Button type='submit' className='bg-green-600 hover:bg-green-700'>
								<Save className='h-4 w-4 mr-2' />
								Create SHG
							</Button>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
