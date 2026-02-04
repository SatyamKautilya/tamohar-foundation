import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
	return (
		<main className='w-full'>
			{/* HERO SECTION */}
			<section className='relative w-full h-[80vh] flex items-center bg-gray-100'>
				<Image
					src='/images/hero.jpg' // replace with your image
					alt='Tamohar Foundation'
					fill
					className='object-cover'
					priority
				/>

				<div className='relative z-10 max-w-6xl mx-auto px-6 text-white'>
					<h1 className='text-4xl md:text-5xl font-bold leading-tight'>
						Empowering Lives, <br /> Inspiring Hope
					</h1>
					<p className='mt-4 max-w-xl text-lg'>
						Creating a brighter future for underprivileged communities through
						education, health, and empowerment.
					</p>

					<div className='mt-6 flex gap-4'>
						<Link
							href='/about'
							className='bg-white text-orange-600 px-6 py-3 rounded font-semibold hover:bg-gray-100'>
							Learn More
						</Link>
						<Link
							href='/donate'
							className='bg-orange-600 px-6 py-3 rounded font-semibold hover:bg-orange-700'>
							Donate Now
						</Link>
					</div>
				</div>

				{/* overlay */}
				<div className='absolute inset-0 bg-black/40' />
			</section>

			{/* FOCUS AREAS */}
			<section className='py-16 bg-white'>
				<div className='max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8'>
					{[
						{
							title: 'Education for All',
							desc: 'Providing quality education to every child.',
						},
						{
							title: 'Health & Wellness',
							desc: 'Ensuring access to basic healthcare and well-being.',
						},
						{
							title: 'Women Empowerment',
							desc: 'Supporting women to achieve independence and dignity.',
						},
					].map((item, i) => (
						<div
							key={i}
							className='p-6 border rounded-lg text-center hover:shadow-md transition'>
							<h3 className='text-xl font-semibold text-orange-600'>
								{item.title}
							</h3>
							<p className='mt-3 text-gray-600'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* ABOUT SECTION */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center'>
					<div>
						<h2 className='text-3xl font-bold text-gray-800'>
							About Tamohar Foundation
						</h2>
						<p className='mt-4 text-gray-600 leading-relaxed'>
							Tamohar Foundation is dedicated to uplifting underserved
							communities by focusing on education, health awareness, and
							sustainable social development.
						</p>
						<Link
							href='/about'
							className='inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700'>
							Read More
						</Link>
					</div>

					<div className='relative h-[300px] rounded-lg overflow-hidden'>
						<Image
							src='/images/about.jpg'
							alt='About Tamohar Foundation'
							fill
							className='object-cover'
						/>
					</div>
				</div>
			</section>

			{/* PROGRAMS */}
			<section className='py-16 bg-white'>
				<div className='max-w-6xl mx-auto px-6 text-center'>
					<h2 className='text-3xl font-bold text-gray-800'>Our Key Programs</h2>

					<div className='mt-10 grid md:grid-cols-3 gap-8'>
						{[
							'Child Education',
							'Healthcare Initiatives',
							'Women Empowerment',
						].map((title, i) => (
							<div
								key={i}
								className='border rounded-lg overflow-hidden hover:shadow-md transition'>
								<div className='relative h-48'>
									<Image
										src={`/images/program-${i + 1}.jpg`}
										alt={title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-4 font-semibold'>{title}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className='py-16 bg-orange-600 text-white text-center'>
				<h2 className='text-3xl font-bold'>Make a Difference</h2>
				<p className='mt-3'>Join us in making a positive impact today.</p>

				<div className='mt-6 flex justify-center gap-4'>
					<Link
						href='/volunteer'
						className='bg-white text-orange-600 px-6 py-3 rounded font-semibold'>
						Volunteer
					</Link>
					<Link
						href='/donate'
						className='bg-black px-6 py-3 rounded font-semibold'>
						Donate
					</Link>
				</div>
			</section>
		</main>
	);
}
