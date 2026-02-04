'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
	ArrowRight,
	Heart,
	BookOpen,
	Sun,
	Users,
	CheckCircle2,
	Globe,
	Mail,
	ChevronRight,
} from 'lucide-react';

// --- Animation Variants ---
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

export default function HomePage() {
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect for hero

	return (
		<main className='w-full bg-white selection:bg-orange-100 selection:text-orange-900'>
			{/* --- HERO SECTION WITH PARALLAX --- */}
			<section className='relative h-[95vh] flex items-center justify-center overflow-hidden bg-gray-900'>
				<motion.div
					style={{ y: y1 }}
					className='absolute inset-0 w-full h-full'>
					{/* Fallback color if image fails */}
					<div className='absolute inset-0 bg-gray-800' />
					<Image
						src='/images/hero-modern.jpg' // Ensure you have a high-res image here
						alt='Smiles of children'
						fill
						className='object-cover opacity-50'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30' />
				</motion.div>

				<div className='relative z-10 container mx-auto px-6 text-center'>
					<motion.div
						initial='hidden'
						animate='visible'
						variants={staggerContainer}
						className='max-w-4xl mx-auto'>
						<motion.div
							variants={fadeInUp}
							className='flex justify-center mb-6'>
							<span className='px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 text-orange-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md'>
								Est. 2015 • Registered Non-Profit
							</span>
						</motion.div>

						<motion.h1
							variants={fadeInUp}
							className='text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8'>
							Hope has a <br />
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200'>
								New Address.
							</span>
						</motion.h1>

						<motion.p
							variants={fadeInUp}
							className='text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light'>
							Bridging the gap between <strong>privilege</strong> and{' '}
							<strong>poverty</strong> through education, healthcare, and
							sustainable empowerment.
						</motion.p>

						<motion.div
							variants={fadeInUp}
							className='flex flex-col sm:flex-row gap-5 justify-center items-center'>
							<Link
								href='/donate'
								className='relative group overflow-hidden rounded-full px-10 py-4 bg-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-900/50'>
								<span className='relative z-10 flex items-center gap-2'>
									Donate Now <Heart className='w-5 h-5 fill-current' />
								</span>
								<div className='absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
							</Link>
							<Link
								href='/about'
								className='group flex items-center gap-2 text-white font-semibold hover:text-orange-300 transition-colors'>
								<div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all'>
									<ChevronRight className='w-5 h-5' />
								</div>
								Discover Our Mission
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* --- IMPACT DASHBOARD --- */}
			<section className='relative z-20 -mt-16 container mx-auto px-6'>
				<div className='bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100'>
						{[
							{ label: 'Lives Impacted', value: '15,000+', icon: <Users /> },
							{
								label: 'Children Educated',
								value: '4,200+',
								icon: <BookOpen />,
							},
							{ label: 'Medical Camps', value: '120+', icon: <Heart /> },
							{ label: 'Villages Adoped', value: '12', icon: <Globe /> },
						].map((stat, i) => (
							<div key={i} className='flex flex-col items-center gap-2'>
								<div className='text-orange-100 mb-2 [&>svg]:w-8 [&>svg]:h-8 [&>svg]:text-orange-500'>
									{stat.icon}
								</div>
								<h3 className='text-3xl md:text-4xl font-bold text-gray-900'>
									{stat.value}
								</h3>
								<p className='text-gray-500 text-sm font-medium uppercase tracking-wide'>
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- BENTO GRID MISSION SECTION --- */}
			<section className='py-24 bg-gray-50'>
				<div className='container mx-auto px-6'>
					<div className='mb-16 md:flex justify-between items-end'>
						<div className='max-w-2xl'>
							<h4 className='text-orange-600 font-bold uppercase tracking-widest mb-3'>
								Our Core Pillars
							</h4>
							<h2 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
								Holistic Development for a <br />
								<span className='italic font-serif text-gray-500'>
									Sustainable Future
								</span>
							</h2>
						</div>
						<Link
							href='/programs'
							className='hidden md:flex items-center gap-2 text-gray-900 font-bold hover:text-orange-600 transition'>
							View All Programs <ArrowRight className='w-5 h-5' />
						</Link>
					</div>

					<div className='grid md:grid-cols-3 gap-6 auto-rows-[300px]'>
						{/* Large Card */}
						<motion.div
							whileHover={{ y: -5 }}
							className='md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group'>
							<div className='absolute inset-0 bg-gray-300' /> {/* Fallback */}
							<Image
								src='/images/education.jpg'
								alt='Education'
								fill
								className='object-cover transition-transform duration-700 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end'>
								<h3 className='text-3xl font-bold text-white mb-2'>
									Project Vidya
								</h3>
								<p className='text-gray-300 max-w-lg'>
									Providing quality education, digital literacy, and scholarship
									support to ensuring no child is left behind due to financial
									constraints.
								</p>
							</div>
						</motion.div>

						{/* Tall Card */}
						<motion.div
							whileHover={{ y: -5 }}
							className='row-span-2 relative rounded-3xl overflow-hidden group bg-orange-600 p-8 flex flex-col justify-between text-white'>
							<div>
								<div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6'>
									<Sun className='w-6 h-6 text-white' />
								</div>
								<h3 className='text-2xl font-bold mb-4'>Women Empowerment</h3>
								<p className='text-orange-100 text-sm leading-relaxed'>
									We organize skill development workshops (sewing, handicrafts,
									computer skills) to help women achieve financial independence
									and dignity within their communities.
								</p>
							</div>
							<div className='pt-8 border-t border-white/20'>
								<div className='text-4xl font-bold'>850+</div>
								<div className='text-sm opacity-80'>Women Trained</div>
							</div>
						</motion.div>

						{/* Wide Card */}
						<motion.div
							whileHover={{ y: -5 }}
							className='md:col-span-3 relative rounded-3xl overflow-hidden group bg-white border border-gray-200 p-8 flex items-center gap-8'>
							<div className='flex-1'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='p-2 bg-green-100 rounded-lg text-green-600'>
										<Heart className='w-6 h-6' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900'>
										Health & Nutrition (Arogya)
									</h3>
								</div>
								<p className='text-gray-600 mb-6'>
									Regular health camps, cataract surgeries, and nutritional
									support for expectant mothers and children in remote tribal
									belts.
								</p>
								<Link
									href='/programs/health'
									className='text-green-700 font-bold text-sm uppercase tracking-wider underline underline-offset-4'>
									Read Case Study
								</Link>
							</div>
							<div className='hidden md:block w-1/3 h-full relative rounded-2xl overflow-hidden bg-gray-200'>
								<Image
									src='/images/health.jpg'
									alt='Health Camp'
									fill
									className='object-cover'
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* --- VOLUNTEER / CTA SECTION --- */}
			<section className='py-24 bg-gray-900 text-white overflow-hidden relative'>
				{/* Abstract Background Shapes */}
				<div className='absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
				<div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3' />

				<div className='container mx-auto px-6 relative z-10'>
					<div className='grid lg:grid-cols-2 gap-16 items-center'>
						<div>
							<h2 className='text-4xl md:text-5xl font-bold mb-6'>
								Join the Movement
							</h2>
							<p className='text-xl text-gray-400 mb-8 leading-relaxed'>
								Whether you have time to give or funds to share, your
								contribution creates ripples of change. Be the reason someone
								smiles today.
							</p>

							<div className='space-y-4 mb-10'>
								{[
									'Volunteer for weekend teaching programs',
									"Sponsor a child's education for a year",
									'Corporate CSR partnership opportunities',
								].map((item, i) => (
									<div key={i} className='flex items-center gap-4'>
										<CheckCircle2 className='w-6 h-6 text-green-500 shrink-0' />
										<span className='text-lg text-gray-300'>{item}</span>
									</div>
								))}
							</div>

							<div className='flex flex-wrap gap-4'>
								<Link
									href='/volunteer'
									className='bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition'>
									Become a Volunteer
								</Link>
								<Link
									href='/contact'
									className='border border-gray-700 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition'>
									Partner With Us
								</Link>
							</div>
						</div>

						{/* Image Grid */}
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-4 translate-y-8'>
								<div className='h-64 bg-gray-800 rounded-2xl overflow-hidden relative'>
									<Image
										src='/images/volunteer-1.jpg'
										alt='Volunteers'
										fill
										className='object-cover'
									/>
								</div>
								<div className='h-48 bg-gray-800 rounded-2xl overflow-hidden relative'>
									<Image
										src='/images/volunteer-2.jpg'
										alt='Teaching'
										fill
										className='object-cover'
									/>
								</div>
							</div>
							<div className='space-y-4'>
								<div className='h-48 bg-gray-800 rounded-2xl overflow-hidden relative'>
									<Image
										src='/images/volunteer-3.jpg'
										alt='Community'
										fill
										className='object-cover'
									/>
								</div>
								<div className='h-64 bg-gray-800 rounded-2xl overflow-hidden relative'>
									<Image
										src='/images/volunteer-4.jpg'
										alt='Impact'
										fill
										className='object-cover'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- NEWSLETTER --- */}
			<section className='py-20 border-t border-gray-100'>
				<div className='container mx-auto px-6 text-center max-w-3xl'>
					<div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
						<Mail className='w-8 h-8 text-orange-600' />
					</div>
					<h2 className='text-3xl font-bold text-gray-900 mb-4'>
						Stay Connected
					</h2>
					<p className='text-gray-600 mb-8'>
						Receive quarterly updates on our projects, success stories, and
						transparency reports. No spam, we promise.
					</p>

					<form className='flex flex-col sm:flex-row gap-3'>
						<input
							type='email'
							placeholder='Enter your email address'
							className='flex-1 px-6 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20'
						/>
						<button className='bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition shadow-lg'>
							Subscribe
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
