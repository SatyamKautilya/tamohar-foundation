'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/villages', label: 'Villages' },
	{ href: '/events', label: 'Events' },
	{ href: '/focus-areas', label: 'Focus Areas' },
	{ href: '/shg', label: 'SHGs' },
	{ href: '/about', label: 'About' },
	{ href: '/csr', label: 'CSR Partners' },
	{ href: '/contact', label: 'Contact' },
];

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-16 items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='flex items-center space-x-2'>
					<div className='flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg'>
						T
					</div>
					<div className='flex flex-col'>
						<span className='text-lg font-bold leading-tight text-green-800'>
							Tamohar
						</span>
						<span className='text-[10px] leading-tight text-muted-foreground -mt-0.5'>
							Foundation
						</span>
					</div>
				</Link>

				{/* Desktop Nav */}
				<nav className='hidden lg:flex items-center space-x-1'>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent'>
							{link.label}
						</Link>
					))}
				</nav>

				{/* CTA + Mobile Toggle */}
				<div className='flex items-center space-x-2'>
					<Button
						asChild
						size='sm'
						className='hidden sm:inline-flex bg-green-600 hover:bg-green-700'>
						<Link href='/donate'>
							<Heart className='mr-1.5 h-4 w-4' />
							Donate
						</Link>
					</Button>
					<button
						className='lg:hidden p-2 text-muted-foreground hover:text-foreground'
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label='Toggle menu'>
						{mobileOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			<div
				className={cn(
					'lg:hidden overflow-hidden transition-all duration-300 border-t',
					mobileOpen ? 'max-h-[500px]' : 'max-h-0 border-t-0',
				)}>
				<nav className='container py-4 flex flex-col space-y-1'>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'
							onClick={() => setMobileOpen(false)}>
							{link.label}
						</Link>
					))}
					<div className='pt-2'>
						<Button
							asChild
							size='sm'
							className='w-full bg-green-600 hover:bg-green-700'>
							<Link href='/donate'>
								<Heart className='mr-1.5 h-4 w-4' />
								Donate Now
							</Link>
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
}
