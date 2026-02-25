export const siteConfig = {
	name: 'Tamohar Foundation',
	description:
		'Empowering villages through sustainable development in Health, Education, Economy, and Employment.',
	url: 'https://tamoharfoundation.org',
	ogImage: '/og-image.jpg',
	links: {
		twitter: 'https://twitter.com/tamoharfdn',
		facebook: 'https://facebook.com/tamoharfoundation',
		instagram: 'https://instagram.com/tamoharfoundation',
		linkedin: 'https://linkedin.com/company/tamohar-foundation',
		youtube: 'https://youtube.com/@tamoharfoundation',
	},
	contact: {
		email: 'info@tamoharfoundation.org',
		phone: '+91-XXXXXXXXXX',
		address: 'Tamohar Foundation, India',
	},
	focusAreas: [
		{
			key: 'HEALTH',
			title: 'Health',
			description:
				'Bringing healthcare access to every doorstep in rural India.',
			icon: 'heart-pulse',
			color: 'text-red-500',
			bgColor: 'bg-red-50',
		},
		{
			key: 'EDUCATION',
			title: 'Education',
			description:
				'Building foundations for a brighter future through quality education.',
			icon: 'graduation-cap',
			color: 'text-blue-500',
			bgColor: 'bg-blue-50',
		},
		{
			key: 'ECONOMY',
			title: 'Economy',
			description:
				'Strengthening village economies through sustainable livelihood programs.',
			icon: 'trending-up',
			color: 'text-green-500',
			bgColor: 'bg-green-50',
		},
		{
			key: 'EMPLOYMENT',
			title: 'Employment',
			description:
				'Creating opportunities and building skills for rural employment.',
			icon: 'briefcase',
			color: 'text-purple-500',
			bgColor: 'bg-purple-50',
		},
		{
			key: 'SHG',
			title: 'Self Help Groups',
			description:
				'Empowering communities through collective savings, lending, and enterprise.',
			icon: 'users',
			color: 'text-orange-500',
			bgColor: 'bg-orange-50',
		},
		{
			key: 'GOVERNMENT_SCHEMES',
			title: 'Government Schemes',
			description:
				'Bridging the gap between government welfare programs and rural beneficiaries.',
			icon: 'landmark',
			color: 'text-cyan-500',
			bgColor: 'bg-cyan-50',
		},
	],
} as const;
