import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
	return new Intl.DateTimeFormat('en-IN', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
}

export function formatNumber(num: number): string {
	if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
	if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
	if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
	return num.toLocaleString('en-IN');
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getFocusAreaLabel(area: string): string {
	const labels: Record<string, string> = {
		HEALTH: 'Health',
		EDUCATION: 'Education',
		ECONOMY: 'Economy',
		EMPLOYMENT: 'Employment',
		SHG: 'Self Help Groups',
		GOVERNMENT_SCHEMES: 'Government Schemes',
		ENVIRONMENT: 'Environment',
		INFRASTRUCTURE: 'Infrastructure',
		OTHER: 'Other',
	};
	return labels[area] || area;
}

export function getFocusAreaIcon(area: string): string {
	const icons: Record<string, string> = {
		HEALTH: 'heart-pulse',
		EDUCATION: 'graduation-cap',
		ECONOMY: 'trending-up',
		EMPLOYMENT: 'briefcase',
		SHG: 'users',
		GOVERNMENT_SCHEMES: 'landmark',
		ENVIRONMENT: 'leaf',
		INFRASTRUCTURE: 'building',
		OTHER: 'circle-dot',
	};
	return icons[area] || 'circle-dot';
}
