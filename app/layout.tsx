import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		'Tamohar Foundation',
		'village development',
		'rural India',
		'NGO',
		'self help groups',
		'health camps',
		'education',
		'CSR',
	],
	authors: [{ name: 'Tamohar Foundation' }],
	openGraph: {
		type: 'website',
		locale: 'en_IN',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body className={inter.className}>
				<div className='relative flex min-h-screen flex-col'>
					<Navbar />
					<main className='flex-1'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
