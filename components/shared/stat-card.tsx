'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, formatNumber } from '@/lib/utils';

interface StatCardProps {
	label: string;
	value: number;
	prefix?: string;
	suffix?: string;
	icon?: React.ReactNode;
	className?: string;
	delay?: number;
}

export function StatCard({
	label,
	value,
	prefix = '',
	suffix = '',
	icon,
	className,
	delay = 0,
}: StatCardProps) {
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		const timer = setTimeout(() => {
			const duration = 1500;
			const steps = 40;
			const increment = value / steps;
			let current = 0;

			const interval = setInterval(() => {
				current += increment;
				if (current >= value) {
					setCount(value);
					clearInterval(interval);
				} else {
					setCount(Math.floor(current));
				}
			}, duration / steps);

			return () => clearInterval(interval);
		}, delay);

		return () => clearTimeout(timer);
	}, [isVisible, value, delay]);

	return (
		<div
			ref={ref}
			className={cn(
				'flex flex-col items-center text-center p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow',
				className,
			)}>
			{icon && <div className='mb-3 text-green-600'>{icon}</div>}
			<div className='text-3xl md:text-4xl font-bold text-gray-900'>
				{prefix}
				{formatNumber(count)}
				{suffix}
			</div>
			<div className='mt-1.5 text-sm text-muted-foreground font-medium'>
				{label}
			</div>
		</div>
	);
}
