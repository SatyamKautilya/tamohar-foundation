import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export default function NewEventPage() {
	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h1 className='text-2xl font-bold'>Add New Event</h1>
				<p className='text-muted-foreground text-sm mt-1'>
					Create a new event or activity.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Event Details</CardTitle>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Event Title *
								</label>
								<Input placeholder='e.g., Free Health Camp' required />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Slug *
								</label>
								<Input placeholder='e.g., free-health-camp-rampur' required />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Date *
								</label>
								<Input type='date' required />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									End Date
								</label>
								<Input type='date' />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Location
								</label>
								<Input placeholder='e.g., Rampur Community Hall' />
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Beneficiary Count
								</label>
								<Input type='number' placeholder='0' />
							</div>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Status
								</label>
								<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background'>
									<option value='UPCOMING'>Upcoming</option>
									<option value='ONGOING'>Ongoing</option>
									<option value='COMPLETED'>Completed</option>
									<option value='CANCELLED'>Cancelled</option>
								</select>
							</div>
							<div>
								<label className='text-sm font-medium mb-1.5 block'>
									Village
								</label>
								<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background'>
									<option value=''>Select Village</option>
									<option value='v1'>Rampur</option>
									<option value='v2'>Sundarpur</option>
									<option value='v3'>Govindgarh</option>
								</select>
							</div>
						</div>

						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Description
							</label>
							<Textarea
								placeholder='Describe the event, its purpose, and expected impact...'
								rows={5}
							/>
						</div>

						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Hero Image URL
							</label>
							<Input placeholder='Cloudinary URL for event image' />
						</div>

						<div className='pt-4 flex gap-3'>
							<Button type='submit' className='bg-green-600 hover:bg-green-700'>
								<Save className='h-4 w-4 mr-2' />
								Create Event
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
