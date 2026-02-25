import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export default function NewVillagePage() {
	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h1 className='text-2xl font-bold'>Add New Village</h1>
				<p className='text-muted-foreground text-sm mt-1'>
					Create a new village profile with basic information.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Village Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Village Name *
								</label>
								<Input placeholder='e.g., Rampur' required />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Slug *
								</label>
								<Input placeholder='e.g., rampur' required />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									State *
								</label>
								<Input placeholder='e.g., Madhya Pradesh' required />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									District *
								</label>
								<Input placeholder='e.g., Sagar' required />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Population
								</label>
								<Input type='number' placeholder='2500' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Latitude
								</label>
								<Input type='number' step='any' placeholder='23.8389' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Longitude
								</label>
								<Input type='number' step='any' placeholder='78.7378' />
							</div>
						</div>

						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Description
							</label>
							<Textarea
								placeholder='Describe the village, its challenges, and the work being done...'
								rows={5}
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Hero Image URL
								</label>
								<Input placeholder='Cloudinary URL for hero image' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Thumbnail URL
								</label>
								<Input placeholder='Cloudinary URL for thumbnail' />
							</div>
						</div>

						<div className='pt-4 flex gap-3'>
							<Button type='submit' className='bg-green-600 hover:bg-green-700'>
								<Save className='h-4 w-4 mr-2' />
								Create Village
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
