import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Section } from '@/components/shared/section';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
	title: 'Contact Us',
	description:
		'Get in touch with Tamohar Foundation. Reach out for partnerships, volunteering, donations, or general inquiries.',
};

export default function ContactPage() {
	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-blue-50 to-indigo-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Contact Us
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Have questions, want to partner, or ready to volunteer? We&apos;d
						love to hear from you.
					</p>
				</div>
			</section>

			<Section>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Contact Info */}
					<div className='space-y-6'>
						<h2 className='text-2xl font-bold'>Get in Touch</h2>
						<p className='text-muted-foreground'>
							Reach out to us for partnerships, volunteering opportunities,
							donations, or any general inquiry.
						</p>

						<div className='space-y-4'>
							<div className='flex items-start gap-3'>
								<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-600 shrink-0'>
									<Mail className='h-5 w-5' />
								</div>
								<div>
									<div className='font-medium'>Email</div>
									<a
										href={`mailto:${siteConfig.contact.email}`}
										className='text-sm text-muted-foreground hover:text-green-600'>
										{siteConfig.contact.email}
									</a>
								</div>
							</div>

							<div className='flex items-start gap-3'>
								<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 shrink-0'>
									<Phone className='h-5 w-5' />
								</div>
								<div>
									<div className='font-medium'>Phone</div>
									<a
										href={`tel:${siteConfig.contact.phone}`}
										className='text-sm text-muted-foreground hover:text-blue-600'>
										{siteConfig.contact.phone}
									</a>
								</div>
							</div>

							<div className='flex items-start gap-3'>
								<div className='flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 text-orange-600 shrink-0'>
									<MapPin className='h-5 w-5' />
								</div>
								<div>
									<div className='font-medium'>Address</div>
									<p className='text-sm text-muted-foreground'>
										{siteConfig.contact.address}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='lg:col-span-2'>
						<Card>
							<CardHeader>
								<CardTitle>Send us a Message</CardTitle>
							</CardHeader>
							<CardContent>
								<form className='space-y-4'>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<div>
											<label className='text-sm font-medium mb-1.5 block'>
												Full Name *
											</label>
											<Input placeholder='Your name' required />
										</div>
										<div>
											<label className='text-sm font-medium mb-1.5 block'>
												Email *
											</label>
											<Input
												type='email'
												placeholder='you@example.com'
												required
											/>
										</div>
									</div>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
										<div>
											<label className='text-sm font-medium mb-1.5 block'>
												Phone
											</label>
											<Input type='tel' placeholder='+91 XXXXX XXXXX' />
										</div>
										<div>
											<label className='text-sm font-medium mb-1.5 block'>
												Subject
											</label>
											<Input placeholder='Partnership / Volunteering / Other' />
										</div>
									</div>
									<div>
										<label className='text-sm font-medium mb-1.5 block'>
											Message *
										</label>
										<Textarea
											placeholder="Tell us how you'd like to get involved..."
											rows={5}
											required
										/>
									</div>
									<Button
										type='submit'
										className='bg-green-600 hover:bg-green-700'>
										<Send className='mr-2 h-4 w-4' />
										Send Message
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</Section>
		</>
	);
}
