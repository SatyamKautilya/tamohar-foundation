'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Menu,
	X,
	Heart,
	MapPin,
	Phone,
	Mail,
	ArrowRight,
	BookOpen,
	Activity,
	Users,
	ChevronDown,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navLinks = [
		{ name: 'About Us', href: '#about' },
		{ name: 'Our Work', href: '#work' },
		{ name: 'Impact', href: '#impact' },
		{ name: 'Contact', href: '#contact' },
	];

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				scrolled
					? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
					: 'bg-transparent py-6'
			}`}>
			<div className='container mx-auto px-6 flex justify-between items-center'>
				{/* Logo / Name */}
				<Link href='/' className='flex items-center gap-2'>
					{/* You can replace this div with your Logo Image */}
					<div className='w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl'>
						T
					</div>
					<span
						className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}>
						Tamohar<span className='text-orange-600'>.</span>
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className='hidden md:flex items-center gap-8'>
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`text-sm font-semibold hover:text-orange-500 transition-colors ${
								scrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'
							}`}>
							{link.name}
						</Link>
					))}
					<Link
						href='/donate'
						className='px-6 py-2.5 bg-orange-600 text-white rounded-full font-bold text-sm hover:bg-orange-700 transition shadow-lg shadow-orange-600/20'>
						Donate
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className='md:hidden text-gray-800'
					onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? (
						<X />
					) : (
						<Menu className={scrolled ? 'text-gray-900' : 'text-white'} />
					)}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 md:hidden shadow-xl'>
						<div className='flex flex-col gap-4'>
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className='text-lg font-medium text-gray-800'>
									{link.name}
								</Link>
							))}
							<Link
								href='/donate'
								className='w-full text-center py-3 bg-orange-600 text-white rounded-lg font-bold'>
								Donate Now
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default function HomePage() {
	return (
		<div className='font-sans text-gray-900 selection:bg-orange-100'>
			<Navbar />

			{/* --- HERO SECTION --- */}
			<section className='relative h-screen flex items-center pt-20 overflow-hidden'>
				{/* Background Image with Overlay */}
				<div className='absolute inset-0 z-0'>
					<div className='absolute inset-0 bg-gray-900/60 z-10' />
					<div className='absolute inset-0 bg-gray-800 z-0' />{' '}
					{/* Fallback Color */}
					<Image
						src='/images/hero-new.jpg' // Add your image here
						alt='Community'
						fill
						className='object-cover'
						priority
					/>
				</div>

				<div className='container mx-auto px-6 relative z-20 text-white'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-3xl'>
						<div className='flex items-center gap-3 mb-6'>
							<span className='w-12 h-1 bg-orange-500 rounded-full'></span>
							<span className='text-orange-400 font-bold tracking-widest uppercase text-sm'>
								Non-Profit Organization
							</span>
						</div>
						<h1 className='text-5xl md:text-7xl font-bold leading-tight mb-8'>
							We Rise By <br />
							Lifting <span className='text-orange-500'>Others.</span>
						</h1>
						<p className='text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed'>
							Tamohar Foundation is committed to sustainable development in
							education, healthcare, and women's empowerment across underserved
							India.
						</p>

						<div className='flex flex-wrap gap-4'>
							<Link
								href='/donate'
								className='px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition flex items-center gap-2'>
								Make a Donation <Heart className='w-5 h-5 fill-white/20' />
							</Link>
							<Link
								href='#work'
								className='px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 text-white rounded-full font-bold transition'>
								View Our Work
							</Link>
						</div>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
					className='absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-20 opacity-70'>
					<ChevronDown className='w-8 h-8' />
				</motion.div>
			</section>

			{/* --- ABOUT / MISSION --- */}
			<section id='about' className='py-24 bg-white'>
				<div className='container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center'>
					<div className='relative'>
						<div className='aspect-square rounded-2xl overflow-hidden bg-gray-200 relative z-10'>
							<Image
								src='/images/about-group.jpg'
								alt='Our Team'
								fill
								className='object-cover'
							/>
						</div>
						{/* Decorative pattern */}
						<div className='absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-orange-100 rounded-2xl -z-0' />
						<div className='absolute -top-6 -left-6 w-32 h-32 bg-dots-pattern opacity-20' />
					</div>

					<div>
						<h4 className='text-orange-600 font-bold uppercase tracking-wider mb-2'>
							About Tamohar
						</h4>
						<h2 className='text-4xl font-bold mb-6 text-gray-900'>
							Dedicated to the Unseen and Unheard
						</h2>
						<p className='text-gray-600 text-lg mb-6 leading-relaxed'>
							Founded with a vision to create an equitable society, Tamohar
							Foundation works on the ground level. We don't just send aid; we
							build ecosystems where communities can thrive independently.
						</p>
						<div className='grid grid-cols-2 gap-6 mt-8'>
							<div className='border-l-4 border-orange-500 pl-4'>
								<h3 className='font-bold text-xl'>Mission</h3>
								<p className='text-gray-500 text-sm mt-1'>
									To empower 100,000 lives by 2030 through sustainable
									education.
								</p>
							</div>
							<div className='border-l-4 border-gray-800 pl-4'>
								<h3 className='font-bold text-xl'>Vision</h3>
								<p className='text-gray-500 text-sm mt-1'>
									A world where dignity and opportunity are not privileges, but
									rights.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- OUR WORK (Featured Programs) --- */}
			<section id='work' className='py-24 bg-gray-50'>
				<div className='container mx-auto px-6'>
					<div className='text-center max-w-3xl mx-auto mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Our Key Initiatives
						</h2>
						<p className='text-gray-600'>
							We focus our efforts where they matter most. Our programs are
							designed to solve root problems, not just symptoms.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						{/* Program 1 */}
						<div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group'>
							<div className='h-56 bg-blue-100 relative overflow-hidden'>
								<Image
									src='/images/work-edu.jpg'
									alt='Education'
									fill
									className='object-cover group-hover:scale-110 transition duration-500'
								/>
								<div className='absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase'>
									Education
								</div>
							</div>
							<div className='p-8'>
								<div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600'>
									<BookOpen className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold mb-3'>Project Vidya</h3>
								<p className='text-gray-600 text-sm mb-6'>
									Providing scholarships, school supplies, and after-school
									tutoring to children in slum areas.
								</p>
								<Link
									href='/work/education'
									className='inline-flex items-center text-blue-600 font-bold text-sm hover:underline'>
									Learn More <ArrowRight className='w-4 h-4 ml-1' />
								</Link>
							</div>
						</div>

						{/* Program 2 */}
						<div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group'>
							<div className='h-56 bg-green-100 relative overflow-hidden'>
								<Image
									src='/images/work-health.jpg'
									alt='Health'
									fill
									className='object-cover group-hover:scale-110 transition duration-500'
								/>
								<div className='absolute top-4 left-4 bg-white/90 backdrop-blur text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase'>
									Healthcare
								</div>
							</div>
							<div className='p-8'>
								<div className='w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600'>
									<Activity className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold mb-3'>Health Camps</h3>
								<p className='text-gray-600 text-sm mb-6'>
									Regular checkups, cataract surgeries, and nutritional
									awareness programs for rural families.
								</p>
								<Link
									href='/work/health'
									className='inline-flex items-center text-green-600 font-bold text-sm hover:underline'>
									Learn More <ArrowRight className='w-4 h-4 ml-1' />
								</Link>
							</div>
						</div>

						{/* Program 3 */}
						<div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group'>
							<div className='h-56 bg-orange-100 relative overflow-hidden'>
								<Image
									src='/images/work-women.jpg'
									alt='Women'
									fill
									className='object-cover group-hover:scale-110 transition duration-500'
								/>
								<div className='absolute top-4 left-4 bg-white/90 backdrop-blur text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase'>
									Livelihood
								</div>
							</div>
							<div className='p-8'>
								<div className='w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-600'>
									<Users className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-bold mb-3'>Nari Shakti</h3>
								<p className='text-gray-600 text-sm mb-6'>
									Vocational training in sewing and handicrafts to ensure
									financial independence for women.
								</p>
								<Link
									href='/work/women'
									className='inline-flex items-center text-orange-600 font-bold text-sm hover:underline'>
									Learn More <ArrowRight className='w-4 h-4 ml-1' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- TRANSPARENCY / STATS --- */}
			<section id='impact' className='py-20 bg-gray-900 text-white'>
				<div className='container mx-auto px-6'>
					<div className='grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800'>
						{[
							{ num: '5+', label: 'Years of Service' },
							{ num: '12,000+', label: 'Lives Impacted' },
							{ num: '500+', label: 'Volunteers' },
							{ num: '100%', label: 'Transparency' },
						].map((stat, i) => (
							<div key={i} className='pt-8 md:pt-0 px-4'>
								<div className='text-4xl md:text-5xl font-bold text-orange-500 mb-2'>
									{stat.num}
								</div>
								<div className='text-gray-400 font-medium'>{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- CONTACT & ADDRESS SECTION --- */}
			<section id='contact' className='py-24 bg-white'>
				<div className='container mx-auto px-6'>
					<div className='grid lg:grid-cols-2 gap-12'>
						{/* Contact Form */}
						<div className='bg-gray-50 p-8 rounded-3xl border border-gray-100'>
							<h3 className='text-2xl font-bold mb-6'>Get in Touch</h3>
							<form className='space-y-4'>
								<div className='grid md:grid-cols-2 gap-4'>
									<input
										type='text'
										placeholder='Name'
										className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500'
									/>
									<input
										type='email'
										placeholder='Email'
										className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500'
									/>
								</div>
								<input
									type='text'
									placeholder='Subject'
									className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500'
								/>
								<textarea
									rows={4}
									placeholder='Your Message'
									className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500'></textarea>
								<button className='w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-black transition'>
									Send Message
								</button>
							</form>
						</div>

						{/* Address Details */}
						<div className='flex flex-col justify-center space-y-8 pl-0 lg:pl-10'>
							<div>
								<h4 className='text-orange-600 font-bold uppercase tracking-wider mb-2'>
									Visit Us
								</h4>
								<h2 className='text-3xl font-bold text-gray-900 mb-6'>
									Tamohar Foundation HQ
								</h2>
								<p className='text-gray-600 text-lg leading-relaxed'>
									We love meeting people who share our passion for change. Drop
									by our office or reach out via phone/email.
								</p>
							</div>

							<div className='space-y-6'>
								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-orange-600'>
										<MapPin className='w-6 h-6' />
									</div>
									<div>
										<h5 className='font-bold text-gray-900'>Address</h5>
										<p className='text-gray-600'>
											123, Social Service Lane,
											<br />
											Near Central Park, Sector 5,
											<br />
											New Delhi, India - 110001
										</p>
									</div>
								</div>

								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-orange-600'>
										<Phone className='w-6 h-6' />
									</div>
									<div>
										<h5 className='font-bold text-gray-900'>Phone</h5>
										<p className='text-gray-600'>+91 98765 43210</p>
										<p className='text-gray-600'>+91 11 2345 6789</p>
									</div>
								</div>

								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-orange-600'>
										<Mail className='w-6 h-6' />
									</div>
									<div>
										<h5 className='font-bold text-gray-900'>Email</h5>
										<p className='text-gray-600'>contact@tamohar.org</p>
										<p className='text-gray-600'>support@tamohar.org</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- FOOTER --- */}
			<footer className='bg-gray-900 text-gray-400 py-12 border-t border-gray-800'>
				<div className='container mx-auto px-6'>
					<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
						<div className='mb-4 md:mb-0'>
							<span className='text-2xl font-bold text-white'>
								Tamohar<span className='text-orange-600'> Foundation</span>
							</span>
						</div>
						<div className='flex gap-6'>
							<a href='#' className='hover:text-white transition'>
								<Facebook className='w-5 h-5' />
							</a>
							<a href='#' className='hover:text-white transition'>
								<Twitter className='w-5 h-5' />
							</a>
							<a href='#' className='hover:text-white transition'>
								<Instagram className='w-5 h-5' />
							</a>
							<a href='#' className='hover:text-white transition'>
								<Linkedin className='w-5 h-5' />
							</a>
						</div>
					</div>
					<div className='flex flex-col md:flex-row justify-between text-sm border-t border-gray-800 pt-8'>
						<p>
							&copy; {new Date().getFullYear()} Tamohar Foundation. All rights
							reserved.
						</p>
						<div className='flex gap-6 mt-4 md:mt-0'>
							<Link href='/privacy' className='hover:text-white'>
								Privacy Policy
							</Link>
							<Link href='/terms' className='hover:text-white'>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
