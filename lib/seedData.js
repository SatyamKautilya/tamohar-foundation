import { v4 as uuidv4 } from 'uuid';

export const defaultContent = {
  hero: {
    id: uuidv4(),
    title: 'Tamohar Foundation',
    subtitle: 'Empowering Communities, Transforming Lives',
    description: 'We are dedicated to creating lasting change through education, healthcare, environment conservation, women empowerment, child welfare, and rural development.',
    image: 'https://images.unsplash.com/photo-1552457310-ef08195e7e74',
    ctaText: 'Get Involved',
    ctaLink: '#get-involved'
  },
  about: {
    id: uuidv4(),
    title: 'About Tamohar Foundation',
    story: 'Founded with a vision to create meaningful impact, Tamohar Foundation has been working tirelessly to uplift underprivileged communities across India. Our journey began with a simple belief that every individual deserves access to basic necessities and opportunities to thrive.',
    mission: 'To empower marginalized communities through sustainable development programs that address education, healthcare, environment, women empowerment, child welfare, and rural development.',
    vision: 'A world where every individual has equal opportunities to lead a dignified life, regardless of their social or economic background.',
    image: 'https://images.unsplash.com/photo-1600249212143-a97bcb6ac0db'
  },
  stats: [
    { id: uuidv4(), number: '50,000+', label: 'Lives Impacted', icon: 'Users' },
    { id: uuidv4(), number: '120+', label: 'Villages Reached', icon: 'MapPin' },
    { id: uuidv4(), number: '25+', label: 'Programs Running', icon: 'Heart' },
    { id: uuidv4(), number: '500+', label: 'Volunteers', icon: 'HandHeart' }
  ],
  programs: [
    {
      id: uuidv4(),
      title: 'Education for All',
      description: 'Providing quality education to underprivileged children through schools, scholarships, and digital learning centers.',
      icon: 'GraduationCap',
      image: 'https://images.unsplash.com/photo-1533247774066-59cbfc352299',
      impact: '15,000+ students educated'
    },
    {
      id: uuidv4(),
      title: 'Healthcare Access',
      description: 'Running mobile health clinics, awareness camps, and providing medical assistance to rural communities.',
      icon: 'Stethoscope',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31',
      impact: '25,000+ medical consultations'
    },
    {
      id: uuidv4(),
      title: 'Environment Conservation',
      description: 'Tree plantation drives, waste management programs, and promoting sustainable living practices.',
      icon: 'TreeDeciduous',
      image: 'https://images.unsplash.com/photo-1665250316550-0fac81b86ad4',
      impact: '100,000+ trees planted'
    },
    {
      id: uuidv4(),
      title: 'Women Empowerment',
      description: 'Skill development, self-help groups, and entrepreneurship training for women.',
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1650705791961-0dd9c640b10e',
      impact: '5,000+ women trained'
    },
    {
      id: uuidv4(),
      title: 'Child Welfare',
      description: 'Nutrition programs, child protection services, and creating safe spaces for children.',
      icon: 'Baby',
      image: 'https://images.unsplash.com/photo-1552457310-ef08195e7e74',
      impact: '8,000+ children supported'
    },
    {
      id: uuidv4(),
      title: 'Rural Development',
      description: 'Infrastructure development, livelihood programs, and community empowerment in rural areas.',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1600249212143-a97bcb6ac0db',
      impact: '120+ villages developed'
    }
  ],
  team: [
    {
      id: uuidv4(),
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & President',
      bio: 'A social entrepreneur with 20+ years of experience in community development.',
      image: 'https://images.unsplash.com/photo-1552457310-ef08195e7e74'
    },
    {
      id: uuidv4(),
      name: 'Priya Sharma',
      role: 'Executive Director',
      bio: 'Leading operations and strategic initiatives across all programs.',
      image: 'https://images.unsplash.com/photo-1650705791961-0dd9c640b10e'
    },
    {
      id: uuidv4(),
      name: 'Amit Patel',
      role: 'Program Head',
      bio: 'Overseeing education and healthcare programs with 15 years of field experience.',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31'
    }
  ],
  testimonials: [
    {
      id: uuidv4(),
      name: 'Sunita Devi',
      role: 'Beneficiary - Women Empowerment Program',
      quote: 'Thanks to Tamohar Foundation, I learned tailoring and now run my own small business. My life has completely transformed.',
      image: 'https://images.unsplash.com/photo-1650705791961-0dd9c640b10e'
    },
    {
      id: uuidv4(),
      name: 'Ravi Kumar',
      role: 'Student - Education Program',
      quote: 'The scholarship from Tamohar Foundation helped me complete my engineering degree. I am forever grateful.',
      image: 'https://images.unsplash.com/photo-1552457310-ef08195e7e74'
    },
    {
      id: uuidv4(),
      name: 'Dr. Meena Rao',
      role: 'Partner Organization',
      quote: 'Working with Tamohar Foundation has been inspiring. Their commitment to community welfare is unmatched.',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31'
    }
  ],
  events: [
    {
      id: uuidv4(),
      title: 'Annual Health Camp 2025',
      date: '2025-07-15',
      location: 'Village Rampur, Bihar',
      description: 'Free health checkups, medicines, and awareness sessions for 500+ villagers.',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31'
    },
    {
      id: uuidv4(),
      title: 'Tree Plantation Drive',
      date: '2025-08-05',
      location: 'Multiple Locations',
      description: 'Join us in planting 10,000 trees across 20 villages.',
      image: 'https://images.unsplash.com/photo-1665250316550-0fac81b86ad4'
    },
    {
      id: uuidv4(),
      title: 'Education Fair',
      date: '2025-09-10',
      location: 'Community Center, Delhi',
      description: 'Career counseling and scholarship distribution for underprivileged students.',
      image: 'https://images.unsplash.com/photo-1533247774066-59cbfc352299'
    }
  ],
  gallery: [
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1552457310-ef08195e7e74', caption: 'Children at our learning center' },
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31', caption: 'Health camp in action' },
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1665250316550-0fac81b86ad4', caption: 'Tree plantation drive' },
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1600249212143-a97bcb6ac0db', caption: 'Community development program' },
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1650705791961-0dd9c640b10e', caption: 'Women empowerment workshop' },
    { id: uuidv4(), image: 'https://images.unsplash.com/photo-1533247774066-59cbfc352299', caption: 'Education program' }
  ],
  donation: {
    id: uuidv4(),
    title: 'Support Our Cause',
    description: 'Your generous contribution helps us reach more communities and create lasting impact. Every rupee counts!',
    bankDetails: {
      bankName: 'State Bank of India',
      accountName: 'Tamohar Foundation',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      upiId: 'tamoharfoundation@sbi'
    },
    contactEmail: 'donate@tamoharfoundation.org',
    contactPhone: '+91-9876543210'
  },
  contact: {
    id: uuidv4(),
    address: '123, Social Welfare Road, New Delhi - 110001, India',
    email: 'info@tamoharfoundation.org',
    phone: '+91-9876543210',
    mapUrl: 'https://maps.google.com'
  },
  blogs: [
    {
      id: uuidv4(),
      title: 'The Impact of Education on Rural Communities',
      excerpt: 'How education is transforming lives in remote villages across India.',
      content: 'Education has always been a cornerstone of development...',
      author: 'Dr. Rajesh Kumar',
      date: '2025-06-01',
      image: 'https://images.unsplash.com/photo-1533247774066-59cbfc352299',
      category: 'Education'
    },
    {
      id: uuidv4(),
      title: 'Women Leading Change in Their Communities',
      excerpt: 'Stories of empowered women creating ripples of positive change.',
      content: 'When women are empowered, entire communities transform...',
      author: 'Priya Sharma',
      date: '2025-05-15',
      image: 'https://images.unsplash.com/photo-1650705791961-0dd9c640b10e',
      category: 'Women Empowerment'
    }
  ]
};
