// Mock data for development & demo purposes
// Replace with Prisma queries when database is connected

export interface MockVillage {
	id: string;
	name: string;
	slug: string;
	description: string;
	state: string;
	district: string;
	population: number;
	heroImage: string;
	thumbnail: string;
	isActive: boolean;
	programs: MockProgram[];
	events: MockEvent[];
	shgs: MockSHG[];
	impactMetrics: MockImpactMetric[];
}

export interface MockProgram {
	id: string;
	title: string;
	slug: string;
	description: string;
	focusArea: string;
	isActive: boolean;
	beneficiaryCount: number;
	thumbnail: string;
	villageId: string;
}

export interface MockEvent {
	id: string;
	title: string;
	slug: string;
	description: string;
	date: string;
	location: string;
	status: string;
	beneficiaryCount: number;
	heroImage: string;
	isPublished: boolean;
	villageId: string;
	villageName?: string;
}

export interface MockSHG {
	id: string;
	name: string;
	slug: string;
	description: string;
	memberCount: number;
	category: string;
	savingsTotal: number;
	loansDisbursed: number;
	isActive: boolean;
	villageId: string;
}

export interface MockImpactMetric {
	id: string;
	label: string;
	value: number;
	unit: string;
	category: string;
	villageId: string;
}

// ────────────────────────────────────────
// VILLAGES
// ────────────────────────────────────────
export const villages: MockVillage[] = [
	{
		id: 'v1',
		name: 'Rampur',
		slug: 'rampur',
		description:
			'Rampur is a vibrant village in central India where Tamohar Foundation has been driving health, education, and economic programs since 2020. Once lacking basic healthcare access, the village now has a functioning health center and 3 active SHGs.',
		state: 'Madhya Pradesh',
		district: 'Sagar',
		population: 2800,
		heroImage:
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
		thumbnail:
			'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		isActive: true,
		programs: [],
		events: [],
		shgs: [],
		impactMetrics: [],
	},
	{
		id: 'v2',
		name: 'Sundarpur',
		slug: 'sundarpur',
		description:
			"Sundarpur is a model village for Tamohar's education initiative. With over 150 children enrolled in our learning centers, literacy rates have jumped 40% in just two years. The village also runs two thriving women-led SHGs.",
		state: 'Madhya Pradesh',
		district: 'Damoh',
		population: 1900,
		heroImage:
			'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
		thumbnail:
			'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
		isActive: true,
		programs: [],
		events: [],
		shgs: [],
		impactMetrics: [],
	},
	{
		id: 'v3',
		name: 'Govindgarh',
		slug: 'govindgarh',
		description:
			"Govindgarh has become a showcase of economic empowerment. A farmer cooperative formed through Tamohar's program now generates collective revenue, and 5 SHGs manage over ₹8 lakhs in savings.",
		state: 'Madhya Pradesh',
		district: 'Tikamgarh',
		population: 3500,
		heroImage:
			'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop',
		thumbnail:
			'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
		isActive: true,
		programs: [],
		events: [],
		shgs: [],
		impactMetrics: [],
	},
];

// ────────────────────────────────────────
// PROGRAMS
// ────────────────────────────────────────
export const programs: MockProgram[] = [
	{
		id: 'p1',
		title: 'Village Health Initiative',
		slug: 'village-health-initiative',
		description:
			'Monthly health camps providing free checkups, medicine distribution, and health awareness sessions.',
		focusArea: 'HEALTH',
		isActive: true,
		beneficiaryCount: 1200,
		thumbnail:
			'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
		villageId: 'v1',
	},
	{
		id: 'p2',
		title: 'Asha Learning Centers',
		slug: 'asha-learning-centers',
		description:
			'After-school learning centers providing supplementary education to children aged 6-14.',
		focusArea: 'EDUCATION',
		isActive: true,
		beneficiaryCount: 350,
		thumbnail:
			'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
		villageId: 'v2',
	},
	{
		id: 'p3',
		title: 'Kisan Samriddhi Program',
		slug: 'kisan-samriddhi-program',
		description:
			'Agricultural training, modern farming techniques, and market linkage for smallholder farmers.',
		focusArea: 'ECONOMY',
		isActive: true,
		beneficiaryCount: 800,
		thumbnail:
			'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
		villageId: 'v3',
	},
	{
		id: 'p4',
		title: 'Skill India Connect',
		slug: 'skill-india-connect',
		description:
			'Vocational training in tailoring, computer literacy, and small business management.',
		focusArea: 'EMPLOYMENT',
		isActive: true,
		beneficiaryCount: 220,
		thumbnail:
			'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
		villageId: 'v1',
	},
	{
		id: 'p5',
		title: 'Shakti SHG Network',
		slug: 'shakti-shg-network',
		description:
			"Formation and mentoring of women's self-help groups for financial independence.",
		focusArea: 'SHG',
		isActive: true,
		beneficiaryCount: 500,
		thumbnail:
			'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
		villageId: 'v2',
	},
	{
		id: 'p6',
		title: 'Jan Yojana Awareness',
		slug: 'jan-yojana-awareness',
		description:
			'Helping villagers access government welfare schemes like PM Awas, Ujjwala, and Jan Dhan.',
		focusArea: 'GOVERNMENT_SCHEMES',
		isActive: true,
		beneficiaryCount: 950,
		thumbnail:
			'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=300&fit=crop',
		villageId: 'v3',
	},
];

// ────────────────────────────────────────
// EVENTS
// ────────────────────────────────────────
export const events: MockEvent[] = [
	{
		id: 'e1',
		title: 'Free Health Camp – Rampur',
		slug: 'free-health-camp-rampur',
		description:
			'A comprehensive health camp offering free checkups for 300+ villagers, including eye testing, blood sugar, and BP screenings.',
		date: '2026-02-15',
		location: 'Rampur Community Hall',
		status: 'COMPLETED',
		beneficiaryCount: 320,
		heroImage:
			'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
		isPublished: true,
		villageId: 'v1',
		villageName: 'Rampur',
	},
	{
		id: 'e2',
		title: 'Annual Education Fair',
		slug: 'annual-education-fair',
		description:
			'A day of learning, competitions, and exhibitions showcasing student projects from Asha Learning Centers.',
		date: '2026-03-10',
		location: 'Sundarpur School Ground',
		status: 'UPCOMING',
		beneficiaryCount: 200,
		heroImage:
			'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
		isPublished: true,
		villageId: 'v2',
		villageName: 'Sundarpur',
	},
	{
		id: 'e3',
		title: 'Farmer Training Workshop',
		slug: 'farmer-training-workshop',
		description:
			'Hands-on workshop on organic farming, crop rotation, and government subsidy awareness for 150 farmers.',
		date: '2026-01-20',
		location: 'Govindgarh Panchayat Bhawan',
		status: 'COMPLETED',
		beneficiaryCount: 150,
		heroImage:
			'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=400&fit=crop',
		isPublished: true,
		villageId: 'v3',
		villageName: 'Govindgarh',
	},
	{
		id: 'e4',
		title: 'SHG Mela – Women Entrepreneurs Showcase',
		slug: 'shg-mela-women-entrepreneurs',
		description:
			'A marketplace event where SHG women displayed and sold handmade products, generating ₹2.5 lakh revenue in a single day.',
		date: '2026-04-05',
		location: 'Sundarpur Market Area',
		status: 'UPCOMING',
		beneficiaryCount: 100,
		heroImage:
			'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=400&fit=crop',
		isPublished: true,
		villageId: 'v2',
		villageName: 'Sundarpur',
	},
	{
		id: 'e5',
		title: 'Skill Development Drive',
		slug: 'skill-development-drive',
		description:
			'A 3-day intensive training on computer basics, tailoring, and entrepreneurship for rural youth.',
		date: '2026-02-01',
		location: 'Rampur Training Center',
		status: 'COMPLETED',
		beneficiaryCount: 75,
		heroImage:
			'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop',
		isPublished: true,
		villageId: 'v1',
		villageName: 'Rampur',
	},
];

// ────────────────────────────────────────
// SHGs
// ────────────────────────────────────────
export const shgs: MockSHG[] = [
	{
		id: 's1',
		name: 'Lakshmi Mahila Mandal',
		slug: 'lakshmi-mahila-mandal',
		description:
			"A women's self-help group focused on savings, micro-lending, and pickle-making enterprise.",
		memberCount: 12,
		category: 'Women',
		savingsTotal: 185000,
		loansDisbursed: 120000,
		isActive: true,
		villageId: 'v1',
	},
	{
		id: 's2',
		name: 'Saraswati Bachat Group',
		slug: 'saraswati-bachat-group',
		description:
			"Education-focused SHG that funds children's school supplies and uniforms.",
		memberCount: 15,
		category: 'Women',
		savingsTotal: 220000,
		loansDisbursed: 95000,
		isActive: true,
		villageId: 'v2',
	},
	{
		id: 's3',
		name: 'Kisan Pragati Group',
		slug: 'kisan-pragati-group',
		description:
			"A farmers' SHG pooling resources for bulk seed purchase and equipment sharing.",
		memberCount: 18,
		category: 'Farmer',
		savingsTotal: 350000,
		loansDisbursed: 280000,
		isActive: true,
		villageId: 'v3',
	},
	{
		id: 's4',
		name: 'Nari Shakti Samuh',
		slug: 'nari-shakti-samuh',
		description:
			"Women's empowerment group engaged in tailoring and handicraft production.",
		memberCount: 10,
		category: 'Women',
		savingsTotal: 145000,
		loansDisbursed: 80000,
		isActive: true,
		villageId: 'v1',
	},
	{
		id: 's5',
		name: 'Yuva Udyam Group',
		slug: 'yuva-udyam-group',
		description:
			'Youth enterprise group focused on digital literacy and small business startups.',
		memberCount: 14,
		category: 'Youth',
		savingsTotal: 175000,
		loansDisbursed: 110000,
		isActive: true,
		villageId: 'v2',
	},
];

// ────────────────────────────────────────
// IMPACT METRICS
// ────────────────────────────────────────
export const impactMetrics: MockImpactMetric[] = [
	{
		id: 'm1',
		label: 'Health Camps Conducted',
		value: 48,
		unit: 'camps',
		category: 'HEALTH',
		villageId: 'v1',
	},
	{
		id: 'm2',
		label: 'Patients Treated',
		value: 3200,
		unit: 'people',
		category: 'HEALTH',
		villageId: 'v1',
	},
	{
		id: 'm3',
		label: 'Children Enrolled',
		value: 350,
		unit: 'children',
		category: 'EDUCATION',
		villageId: 'v2',
	},
	{
		id: 'm4',
		label: 'Literacy Rate Increase',
		value: 40,
		unit: '%',
		category: 'EDUCATION',
		villageId: 'v2',
	},
	{
		id: 'm5',
		label: 'Farmers Trained',
		value: 800,
		unit: 'farmers',
		category: 'ECONOMY',
		villageId: 'v3',
	},
	{
		id: 'm6',
		label: 'Income Increase',
		value: 35,
		unit: '%',
		category: 'ECONOMY',
		villageId: 'v3',
	},
	{
		id: 'm7',
		label: 'SHGs Formed',
		value: 12,
		unit: 'groups',
		category: 'SHG',
		villageId: 'v1',
	},
	{
		id: 'm8',
		label: 'Total Savings',
		value: 1075000,
		unit: '₹',
		category: 'SHG',
		villageId: 'v1',
	},
	{
		id: 'm9',
		label: 'Youth Skilled',
		value: 220,
		unit: 'people',
		category: 'EMPLOYMENT',
		villageId: 'v1',
	},
	{
		id: 'm10',
		label: 'Scheme Beneficiaries',
		value: 950,
		unit: 'families',
		category: 'GOVERNMENT_SCHEMES',
		villageId: 'v3',
	},
];

// Attach relations
villages[0].programs = programs.filter((p) => p.villageId === 'v1');
villages[1].programs = programs.filter((p) => p.villageId === 'v2');
villages[2].programs = programs.filter((p) => p.villageId === 'v3');

villages[0].events = events.filter((e) => e.villageId === 'v1');
villages[1].events = events.filter((e) => e.villageId === 'v2');
villages[2].events = events.filter((e) => e.villageId === 'v3');

villages[0].shgs = shgs.filter((s) => s.villageId === 'v1');
villages[1].shgs = shgs.filter((s) => s.villageId === 'v2');
villages[2].shgs = shgs.filter((s) => s.villageId === 'v3');

villages[0].impactMetrics = impactMetrics.filter((m) => m.villageId === 'v1');
villages[1].impactMetrics = impactMetrics.filter((m) => m.villageId === 'v2');
villages[2].impactMetrics = impactMetrics.filter((m) => m.villageId === 'v3');

// ────────────────────────────────────────
// AGGREGATE STATS (for homepage)
// ────────────────────────────────────────
export const globalStats = {
	villagesImpacted: villages.length,
	totalBeneficiaries: 4020,
	programsRunning: programs.filter((p) => p.isActive).length,
	shgsFormed: shgs.length,
	eventsCompleted: events.filter((e) => e.status === 'COMPLETED').length,
	totalSavings: shgs.reduce((sum, s) => sum + s.savingsTotal, 0),
};
