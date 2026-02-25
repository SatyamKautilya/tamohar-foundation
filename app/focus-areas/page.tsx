import type { Metadata } from 'next';
import {
	HeartPulse,
	GraduationCap,
	TrendingUp,
	Briefcase,
	Users,
	Landmark,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/shared/section';
import { siteConfig } from '@/lib/config';
import { programs } from '@/lib/mock-data';
import { getFocusAreaLabel } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Focus Areas',
	description:
		'Tamohar Foundation focuses on Health, Education, Economy, Employment, SHGs, and Government Scheme Awareness to drive village transformation.',
};

const focusIcons: Record<string, React.ReactNode> = {
	HEALTH: <HeartPulse className='h-10 w-10' />,
	EDUCATION: <GraduationCap className='h-10 w-10' />,
	ECONOMY: <TrendingUp className='h-10 w-10' />,
	EMPLOYMENT: <Briefcase className='h-10 w-10' />,
	SHG: <Users className='h-10 w-10' />,
	GOVERNMENT_SCHEMES: <Landmark className='h-10 w-10' />,
};

const focusDetails: Record<
	string,
	{ problem: string; intervention: string; impact: string }
> = {
	HEALTH: {
		problem:
			'Rural villages lack access to basic healthcare. Many villagers travel 30+ km for a simple checkup.',
		intervention:
			'We organize monthly health camps, distribute medicines, conduct eye and dental screenings, and train village health volunteers.',
		impact:
			'3,200+ patients treated, 48 health camps conducted, reduced travel-for-health by 60% in our villages.',
	},
	EDUCATION: {
		problem:
			'Low literacy rates, high dropout rates, and lack of quality education resources in rural schools.',
		intervention:
			'We run after-school learning centers (Asha Centers), provide digital literacy, distribute school supplies, and train teachers.',
		impact:
			'350+ children enrolled, 40% increase in literacy rates, 95% retention in our learning centers.',
	},
	ECONOMY: {
		problem:
			'Smallholder farmers earn below subsistence, with no access to modern techniques or fair markets.',
		intervention:
			'Agricultural training, crop diversification, market linkage, farmer cooperatives, and micro-finance support.',
		impact:
			'800 farmers trained, 35% average income increase, 5 farmer cooperatives formed.',
	},
	EMPLOYMENT: {
		problem:
			'Rural youth migrate to cities for low-wage work due to lack of local skill-building opportunities.',
		intervention:
			'Vocational training in tailoring, computer literacy, electrical work, and small business management.',
		impact:
			'220 youth skilled, 60% placed in jobs or started businesses, reduced migration by 25%.',
	},
	SHG: {
		problem:
			'Women lack financial independence and economic participation in village decision-making.',
		intervention:
			'Formation and mentoring of Self Help Groups for collective savings, micro-lending, and enterprise development.',
		impact:
			'12 SHGs formed, ₹10.75 lakh total savings, ₹6.85 lakh in micro-loans disbursed.',
	},
	GOVERNMENT_SCHEMES: {
		problem:
			"Villagers are unaware of government welfare schemes they're eligible for, losing crores in unclaimed benefits.",
		intervention:
			'Awareness camps, application assistance, document support for PM Awas, Ujjwala, Jan Dhan, and Ayushman Bharat.',
		impact:
			'950 families connected to government schemes, ₹15+ lakh in benefits claimed.',
	},
};

export default function FocusAreasPage() {
	return (
		<>
			{/* Hero */}
			<section className='bg-gradient-to-br from-green-50 to-emerald-50 py-16'>
				<div className='container'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Our Focus Areas
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						We take a holistic, multi-dimensional approach to village
						development. Each area targets a critical pillar of sustainable
						transformation.
					</p>
				</div>
			</section>

			{/* Focus Areas Detail */}
			<Section>
				<div className='space-y-16'>
					{siteConfig.focusAreas.map((area, index) => {
						const detail = focusDetails[area.key];
						const areaPrograms = programs.filter(
							(p) => p.focusArea === area.key,
						);

						return (
							<div
								key={area.key}
								className={`flex flex-col ${
									index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
								} gap-8 lg:gap-12 items-start`}>
								{/* Left: Info */}
								<div className='flex-1 space-y-6'>
									<div className='flex items-center gap-4'>
										<div
											className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${area.bgColor} ${area.color}`}>
											{focusIcons[area.key]}
										</div>
										<h2 className='text-2xl md:text-3xl font-bold'>
											{area.title}
										</h2>
									</div>
									<p className='text-muted-foreground leading-relaxed'>
										{area.description}
									</p>

									{/* Problem → Intervention → Impact */}
									{detail && (
										<div className='space-y-4'>
											<div className='bg-red-50 rounded-lg p-4 border-l-4 border-red-400'>
												<h4 className='font-semibold text-red-800 text-sm mb-1'>
													The Problem
												</h4>
												<p className='text-sm text-red-700'>{detail.problem}</p>
											</div>
											<div className='bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400'>
												<h4 className='font-semibold text-blue-800 text-sm mb-1'>
													Our Intervention
												</h4>
												<p className='text-sm text-blue-700'>
													{detail.intervention}
												</p>
											</div>
											<div className='bg-green-50 rounded-lg p-4 border-l-4 border-green-400'>
												<h4 className='font-semibold text-green-800 text-sm mb-1'>
													The Impact
												</h4>
												<p className='text-sm text-green-700'>
													{detail.impact}
												</p>
											</div>
										</div>
									)}
								</div>

								{/* Right: Related Programs */}
								<div className='flex-1 w-full'>
									<h3 className='text-lg font-semibold mb-4'>
										Related Programs
									</h3>
									{areaPrograms.length > 0 ? (
										<div className='space-y-3'>
											{areaPrograms.map((prog) => (
												<Card
													key={prog.id}
													className='hover:shadow-md transition-shadow'>
													<CardContent className='pt-4'>
														<h4 className='font-semibold'>{prog.title}</h4>
														<p className='text-sm text-muted-foreground mt-1'>
															{prog.description}
														</p>
														<p className='text-sm text-green-600 font-medium mt-2'>
															{prog.beneficiaryCount} beneficiaries
														</p>
													</CardContent>
												</Card>
											))}
										</div>
									) : (
										<p className='text-sm text-muted-foreground'>
											Programs coming soon in this area.
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</Section>
		</>
	);
}
