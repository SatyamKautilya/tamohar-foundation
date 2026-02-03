'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Menu, X, Heart, Users, MapPin, GraduationCap, Stethoscope, TreeDeciduous,
  Baby, Home, HandHeart, Mail, Phone, ChevronRight, Calendar, ArrowRight,
  Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, Send, Check,
  Building, CreditCard, Copy, ExternalLink
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Icon mapping
const iconMap = {
  Users: Users,
  MapPin: MapPin,
  Heart: Heart,
  HandHeart: HandHeart,
  GraduationCap: GraduationCap,
  Stethoscope: Stethoscope,
  TreeDeciduous: TreeDeciduous,
  Baby: Baby,
  Home: Home
};

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState({});
  const [copied, setCopied] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'programs', 'impact', 'events', 'get-involved', 'donate', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result = await response.json();
      if (result.data) {
        setContent(result.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, contact: 'loading' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({ ...formStatus, contact: 'success' });
        e.target.reset();
        setTimeout(() => setFormStatus({ ...formStatus, contact: '' }), 3000);
      } else {
        setFormStatus({ ...formStatus, contact: 'error' });
      }
    } catch (error) {
      setFormStatus({ ...formStatus, contact: 'error' });
    }
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, volunteer: 'loading' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({ ...formStatus, volunteer: 'success' });
        e.target.reset();
        setTimeout(() => setFormStatus({ ...formStatus, volunteer: '' }), 3000);
      } else {
        setFormStatus({ ...formStatus, volunteer: 'error' });
      }
    } catch (error) {
      setFormStatus({ ...formStatus, volunteer: 'error' });
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, newsletter: 'loading' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({ ...formStatus, newsletter: 'success' });
        e.target.reset();
        setTimeout(() => setFormStatus({ ...formStatus, newsletter: '' }), 3000);
      } else {
        setFormStatus({ ...formStatus, newsletter: 'error' });
      }
    } catch (error) {
      setFormStatus({ ...formStatus, newsletter: 'error' });
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Programs' },
    { id: 'impact', label: 'Impact' },
    { id: 'events', label: 'Events' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const { hero, about, stats, programs, team, testimonials, events, gallery, donation, contact, blogs } = content || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                Tamohar Foundation
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-sky-500 text-white'
                      : 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a href="/admin" className="ml-4">
                <Button variant="outline" size="sm" className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                  Admin
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-sky-500 text-white'
                        : 'text-gray-600 hover:bg-sky-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a href="/admin" className="block">
                  <Button variant="outline" className="w-full border-sky-500 text-sky-500">
                    Admin Panel
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-sky-100 text-sky-700 mb-4">
                  <Heart className="w-3 h-3 mr-1" /> Making a Difference Since 2015
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {hero?.title || 'Tamohar Foundation'}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-sky-600 font-medium mb-4"
              >
                {hero?.subtitle || 'Empowering Communities, Transforming Lives'}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {hero?.description || 'Creating lasting change through education, healthcare, and community development.'}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a href="#donate">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    <Heart className="w-5 h-5 mr-2" /> Donate Now
                  </Button>
                </a>
                <a href="#get-involved">
                  <Button size="lg" variant="outline" className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-8 py-6 text-lg rounded-full">
                    Get Involved <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={hero?.image || 'https://images.unsplash.com/photo-1552457310-ef08195e7e74'}
                  alt="Children smiling"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-sky-600">50,000+</p>
                      <p className="text-sm text-gray-600">Lives Impacted</p>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div>
                      <p className="text-2xl font-bold text-sky-600">120+</p>
                      <p className="text-sm text-gray-600">Villages Reached</p>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div>
                      <p className="text-2xl font-bold text-sky-600">25+</p>
                      <p className="text-sm text-gray-600">Programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sky-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats?.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Heart;
              return (
                <motion.div
                  key={stat.id || index}
                  variants={scaleIn}
                  className="text-center text-white"
                >
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-sky-100">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={about?.image || 'https://images.unsplash.com/photo-1600249212143-a97bcb6ac0db'}
                  alt="About Tamohar Foundation"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-sky-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Service</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Badge className="bg-sky-100 text-sky-700 mb-4">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {about?.title || 'About Tamohar Foundation'}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {about?.story || 'Founded with a vision to create meaningful impact...'}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Mission</h4>
                    <p className="text-gray-600 text-sm">{about?.mission || 'To empower marginalized communities...'}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Vision</h4>
                    <p className="text-gray-600 text-sm">{about?.vision || 'A world where every individual has equal opportunities...'}</p>
                  </div>
                </div>
              </div>

              <a href="#programs">
                <Button className="bg-sky-500 hover:bg-sky-600">
                  Explore Our Programs <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <Badge className="bg-sky-100 text-sky-700 mb-4">Our Team</Badge>
              <h3 className="text-3xl font-bold text-gray-900">Meet Our Leaders</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team?.map((member, index) => (
                <motion.div key={member.id || index} variants={fadeInUp}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-sky-500 text-sm mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Our Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Areas We Focus On</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work across multiple areas to create holistic and sustainable impact in communities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programs?.map((program, index) => {
              const IconComponent = iconMap[program.icon] || Heart;
              return (
                <motion.div key={program.id || index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-sky-500" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                      <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                        {program.impact}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Impact / Testimonials Section */}
      <section id="impact" className="py-20 bg-sky-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-700 text-sky-100 mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lives We've Touched</h2>
            <p className="text-sky-200 max-w-2xl mx-auto">
              Real stories from real people whose lives have been transformed through our programs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials?.map((testimonial, index) => (
              <motion.div key={testimonial.id || index} variants={fadeInUp}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sky-300 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-sky-100 italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Upcoming Events</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participate in our events and be a part of the change.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {events?.map((event, index) => (
              <motion.div key={event.id || index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white rounded-lg p-2 text-center shadow-lg">
                        <p className="text-2xl font-bold text-sky-500">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Gallery</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work in Pictures</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {gallery?.map((item, index) => (
              <motion.div
                key={item.id || index}
                variants={scaleIn}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Get Involved</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Be a Part of Change</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              There are many ways you can contribute to our mission and help create lasting impact.
            </p>
          </motion.div>

          <Tabs defaultValue="volunteer" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="volunteer" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                Become a Volunteer
              </TabsTrigger>
              <TabsTrigger value="partner" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                Partner With Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="volunteer">
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Card>
                  <CardHeader>
                    <CardTitle>Join Our Volunteer Network</CardTitle>
                    <CardDescription>
                      Share your time and skills to make a difference in someone's life.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="name" placeholder="Your Name" required />
                        <Input name="email" type="email" placeholder="Email Address" required />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="phone" placeholder="Phone Number" required />
                        <Input name="skills" placeholder="Your Skills (e.g., Teaching, Medical)" required />
                      </div>
                      <Input name="availability" placeholder="Availability (e.g., Weekends, Full-time)" required />
                      <Textarea name="motivation" placeholder="Why do you want to volunteer with us?" rows={4} required />
                      <Button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600"
                        disabled={formStatus.volunteer === 'loading'}
                      >
                        {formStatus.volunteer === 'loading' ? (
                          'Submitting...'
                        ) : formStatus.volunteer === 'success' ? (
                          <><Check className="w-4 h-4 mr-2" /> Application Submitted!</>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" /> Submit Application</>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="partner">
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Card>
                  <CardHeader>
                    <CardTitle>Partner With Tamohar Foundation</CardTitle>
                    <CardDescription>
                      Collaborate with us for CSR initiatives, sponsorships, or joint programs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Building className="w-5 h-5 text-sky-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">CSR Partnerships</h4>
                            <p className="text-sm text-gray-600">Align your corporate values with meaningful social impact.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <HandHeart className="w-5 h-5 text-sky-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Program Sponsorship</h4>
                            <p className="text-sm text-gray-600">Sponsor specific programs aligned with your goals.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-sky-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Employee Engagement</h4>
                            <p className="text-sm text-gray-600">Engage your team in meaningful volunteer activities.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-sky-50 rounded-xl p-6">
                        <h4 className="font-semibold mb-4">Contact Our Partnership Team</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-sky-500" />
                            <span className="text-sm">partnerships@tamoharfoundation.org</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-sky-500" />
                            <span className="text-sm">+91-9876543210</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-sky-500 hover:bg-sky-600">
                          <Mail className="w-4 h-4 mr-2" /> Send Partnership Inquiry
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-gradient-to-br from-sky-500 to-sky-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white mb-4">
                <Heart className="w-3 h-3 mr-1" /> Support Our Cause
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {donation?.title || 'Support Our Cause'}
              </h2>
              <p className="text-sky-100 mb-8 text-lg">
                {donation?.description || 'Your generous contribution helps us reach more communities.'}
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" /> Bank Details for Donation
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sky-200">Bank Name:</span>
                    <span className="font-medium">{donation?.bankDetails?.bankName || 'State Bank of India'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-200">Account Name:</span>
                    <span className="font-medium">{donation?.bankDetails?.accountName || 'Tamohar Foundation'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-200">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{donation?.bankDetails?.accountNumber || '1234567890'}</span>
                      <button
                        onClick={() => copyToClipboard(donation?.bankDetails?.accountNumber || '1234567890', 'account')}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        {copied === 'account' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-200">IFSC Code:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{donation?.bankDetails?.ifscCode || 'SBIN0001234'}</span>
                      <button
                        onClick={() => copyToClipboard(donation?.bankDetails?.ifscCode || 'SBIN0001234', 'ifsc')}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        {copied === 'ifsc' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sky-200">UPI ID:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{donation?.bankDetails?.upiId || 'tamoharfoundation@sbi'}</span>
                      <button
                        onClick={() => copyToClipboard(donation?.bankDetails?.upiId || 'tamoharfoundation@sbi', 'upi')}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        {copied === 'upi' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-white text-gray-900">
                <CardHeader>
                  <CardTitle>Contact Us to Donate</CardTitle>
                  <CardDescription>
                    Have questions about donations? Reach out to us.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-xl">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-sky-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{donation?.contactEmail || 'donate@tamoharfoundation.org'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-sky-50 rounded-xl">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-sky-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{donation?.contactPhone || '+91-9876543210'}</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> All donations to Tamohar Foundation are eligible for tax exemption under Section 80G of the Income Tax Act.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Latest News</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Our Blog</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {blogs?.map((blog, index) => (
              <motion.div key={blog.id || index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge variant="secondary">{blog.category}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {blog.author}</span>
                      <Button variant="link" className="text-sky-500 p-0">
                        Read More <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="bg-sky-100 text-sky-700 mb-4">Contact Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to learn more about our work? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="name" placeholder="Your Name" required />
                      <Input name="email" type="email" placeholder="Email Address" required />
                    </div>
                    <Input name="phone" placeholder="Phone Number" />
                    <Input name="subject" placeholder="Subject" required />
                    <Textarea name="message" placeholder="Your Message" rows={4} required />
                    <Button
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      disabled={formStatus.contact === 'loading'}
                    >
                      {formStatus.contact === 'loading' ? (
                        'Sending...'
                      ) : formStatus.contact === 'success' ? (
                        <><Check className="w-4 h-4 mr-2" /> Message Sent!</>
                      ) : (
                        <><Send className="w-4 h-4 mr-2" /> Send Message</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                      <p className="text-gray-600">{contact?.address || '123, Social Welfare Road, New Delhi - 110001, India'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                      <p className="text-gray-600">{contact?.email || 'info@tamoharfoundation.org'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                      <p className="text-gray-600">{contact?.phone || '+91-9876543210'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-sky-500 text-white">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-sky-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-sky-200 mb-6">Subscribe to our newsletter for updates on our work and upcoming events.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-sky-200"
              />
              <Button
                type="submit"
                className="bg-white text-sky-900 hover:bg-sky-100"
                disabled={formStatus.newsletter === 'loading'}
              >
                {formStatus.newsletter === 'loading' ? (
                  'Subscribing...'
                ) : formStatus.newsletter === 'success' ? (
                  <><Check className="w-4 h-4 mr-2" /> Subscribed!</>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">Tamohar Foundation</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering communities and transforming lives through sustainable development programs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white text-sm">About Us</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-white text-sm">Programs</a></li>
                <li><a href="#events" className="text-gray-400 hover:text-white text-sm">Events</a></li>
                <li><a href="#donate" className="text-gray-400 hover:text-white text-sm">Donate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2">
                <li><a href="#get-involved" className="text-gray-400 hover:text-white text-sm">Volunteer</a></li>
                <li><a href="#get-involved" className="text-gray-400 hover:text-white text-sm">Partner</a></li>
                <li><a href="#donate" className="text-gray-400 hover:text-white text-sm">Donate</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>New Delhi, India</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@tamoharfoundation.org</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91-9876543210</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Tamohar Foundation. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
