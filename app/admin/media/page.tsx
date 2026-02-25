import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export default function AdminMediaPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold'>Media Library</h1>
				<p className='text-muted-foreground text-sm mt-1'>
					Upload and manage images for villages, events, and gallery.
				</p>
			</div>

			{/* Upload Section */}
			<Card>
				<CardHeader>
					<CardTitle>Upload Media</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-green-300 transition-colors cursor-pointer'>
						<Upload className='h-10 w-10 text-muted-foreground mx-auto mb-4' />
						<p className='text-sm font-medium mb-1'>
							Drag & drop images here, or click to browse
						</p>
						<p className='text-xs text-muted-foreground'>
							PNG, JPG, WEBP up to 10MB. Will be uploaded to Cloudinary.
						</p>
					</div>
					<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Caption
							</label>
							<Input placeholder='Describe this image' />
						</div>
						<div>
							<label className='text-sm font-medium mb-1.5 block'>
								Link to Village
							</label>
							<select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
								<option value=''>None</option>
								<option value='v1'>Rampur</option>
								<option value='v2'>Sundarpur</option>
								<option value='v3'>Govindgarh</option>
							</select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Placeholder grid */}
			<Card>
				<CardHeader>
					<CardTitle>Uploaded Media</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-sm text-muted-foreground py-8 text-center'>
						Media library will display uploaded images here once Cloudinary
						integration is configured. Set{' '}
						<code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> in your environment
						variables.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
