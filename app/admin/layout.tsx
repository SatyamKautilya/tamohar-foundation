import type { Metadata } from 'next';
import Link from 'next/link';
import {
	LayoutDashboard,
	MapPin,
	Calendar,
	Users,
	Image as ImageIcon,
	BarChart3,
	Settings,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'Admin Panel',
	description: 'Tamohar Foundation Admin Dashboard',
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebarLinks = [
		{ href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
		{ href: '/admin/villages', icon: MapPin, label: 'Villages' },
		{ href: '/admin/events', icon: Calendar, label: 'Events' },
		{ href: '/admin/shgs', icon: Users, label: 'SHGs' },
		{ href: '/admin/media', icon: ImageIcon, label: 'Media' },
		{ href: '/admin/metrics', icon: BarChart3, label: 'Metrics' },
		{ href: '/admin/settings', icon: Settings, label: 'Settings' },
	];

	return (
		<div className='flex min-h-[calc(100vh-4rem)]'>
			{/* Sidebar */}
			<aside className='hidden md:flex w-64 flex-col border-r bg-gray-50/50'>
				<div className='p-4 border-b'>
					<h2 className='font-bold text-lg text-green-700'>Admin Panel</h2>
					<p className='text-xs text-muted-foreground'>
						Manage Foundation Data
					</p>
				</div>
				<nav className='flex-1 p-3 space-y-1'>
					{sidebarLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'>
							<link.icon className='h-4 w-4' />
							{link.label}
						</Link>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<div className='flex-1 overflow-auto'>
				<div className='p-6 md:p-8'>{children}</div>
			</div>
		</div>
	);
}
