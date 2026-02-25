import Link from 'next/link';
import {
	Heart,
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Footer() {
	return (
		<footer className='bg-gray-900 text-gray-300'>
			{/* Main Footer */}
			<div className='container py-12 lg:py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* About Column */}
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<div className='flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg'>
								T
							</div>
							<div>
								<span className='text-lg font-bold text-white'>
									Tamohar Foundation
								</span>
							</div>
						</div>
						<p className='text-sm leading-relaxed text-gray-400'>
							Empowering villages through sustainable development. We work on
							Health, Education, Economy, and Employment to create lasting
							change in rural India.
						</p>
						<div className='flex space-x-3'>
							<a
								href={siteConfig.links.facebook}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-white transition-colors'
								aria-label='Facebook'>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href={siteConfig.links.twitter}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-white transition-colors'
								aria-label='Twitter'>
								<Twitter className='h-5 w-5' />
							</a>
							<a
								href={siteConfig.links.instagram}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-white transition-colors'
								aria-label='Instagram'>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href={siteConfig.links.linkedin}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-white transition-colors'
								aria-label='LinkedIn'>
								<Linkedin className='h-5 w-5' />
							</a>
							<a
								href={siteConfig.links.youtube}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:text-white transition-colors'
								aria-label='YouTube'>
								<Youtube className='h-5 w-5' />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-white'>
							Quick Links
						</h3>
						<ul className='space-y-2.5'>
							{[
								{ href: '/villages', label: 'Our Villages' },
								{ href: '/events', label: 'Events' },
								{ href: '/focus-areas', label: 'Focus Areas' },
								{ href: '/shg', label: 'Self Help Groups' },
								{ href: '/gallery', label: 'Gallery' },
								{ href: '/about', label: 'About Us' },
							].map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-sm hover:text-white transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Get Involved */}
					<div className='space-y-4'>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-white'>
							Get Involved
						</h3>
						<ul className='space-y-2.5'>
							{[
								{ href: '/donate', label: 'Donate' },
								{ href: '/csr', label: 'CSR Partnership' },
								{ href: '/contact', label: 'Volunteer' },
								{ href: '/contact', label: 'Contact Us' },
							].map((link, i) => (
								<li key={i}>
									<Link
										href={link.href}
										className='text-sm hover:text-white transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className='space-y-4'>
						<h3 className='text-sm font-semibold uppercase tracking-wider text-white'>
							Contact
						</h3>
						<ul className='space-y-3'>
							<li className='flex items-start space-x-3'>
								<MapPin className='h-4 w-4 mt-0.5 shrink-0 text-green-400' />
								<span className='text-sm'>{siteConfig.contact.address}</span>
							</li>
							<li className='flex items-center space-x-3'>
								<Mail className='h-4 w-4 shrink-0 text-green-400' />
								<a
									href={`mailto:${siteConfig.contact.email}`}
									className='text-sm hover:text-white transition-colors'>
									{siteConfig.contact.email}
								</a>
							</li>
							<li className='flex items-center space-x-3'>
								<Phone className='h-4 w-4 shrink-0 text-green-400' />
								<a
									href={`tel:${siteConfig.contact.phone}`}
									className='text-sm hover:text-white transition-colors'>
									{siteConfig.contact.phone}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className='border-t border-gray-800'>
				<div className='container py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<p className='text-xs text-gray-500'>
						© {new Date().getFullYear()} Tamohar Foundation. All rights
						reserved.
					</p>
					<p className='text-xs text-gray-500 flex items-center'>
						Built with <Heart className='h-3 w-3 mx-1 text-red-500' /> for
						village transformation
					</p>
				</div>
			</div>
		</footer>
	);
}
