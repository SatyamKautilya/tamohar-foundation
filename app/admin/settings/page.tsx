import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h1 className='text-2xl font-bold'>Settings</h1>
				<p className='text-muted-foreground text-sm mt-1'>
					Configure site settings and admin preferences.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Site Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Organization Name
							</label>
							<Input defaultValue='Tamohar Foundation' />
						</div>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Contact Email
							</label>
							<Input defaultValue='info@tamoharfoundation.org' />
						</div>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Contact Phone
							</label>
							<Input defaultValue='+91-XXXXXXXXXX' />
						</div>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Address
							</label>
							<Input defaultValue='Tamohar Foundation, India' />
						</div>
						<Button type='submit' className='bg-green-600 hover:bg-green-700'>
							<Save className='h-4 w-4 mr-2' />
							Save Settings
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Integrations</CardTitle>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Cloudinary Cloud Name
							</label>
							<Input placeholder='your-cloud-name' />
						</div>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Database URL
							</label>
							<Input placeholder='postgresql://...' type='password' />
						</div>
						<Button type='submit' variant='outline'>
							<Save className='h-4 w-4 mr-2' />
							Update Integrations
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
