import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	title?: string;
	subtitle?: string;
	centered?: boolean;
	id?: string;
}

export function Section({
	children,
	className,
	title,
	subtitle,
	centered = false,
	id,
}: SectionProps) {
	return (
		<section id={id} className={cn('py-16 md:py-20', className)}>
			<div className='container'>
				{(title || subtitle) && (
					<div className={cn('mb-10 md:mb-12', centered && 'text-center')}>
						{title && (
							<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>
								{title}
							</h2>
						)}
						{subtitle && (
							<p className='mt-3 text-lg text-muted-foreground max-w-2xl mx-auto'>
								{subtitle}
							</p>
						)}
					</div>
				)}
				{children}
			</div>
		</section>
	);
}
