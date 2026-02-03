'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Heart, LogOut, Home, Users, FileText, Calendar, Mail, Settings,
  Plus, Edit, Trash2, Save, X, Check, Eye, Image, MapPin, Building,
  GraduationCap, Stethoscope, TreeDeciduous, Baby, HandHeart, Loader2,
  LayoutDashboard, MessageSquare, UserPlus
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveStatus, setSaveStatus] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  
  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Edit dialogs
  const [editDialog, setEditDialog] = useState({ open: false, type: '', data: null, index: null });

  useEffect(() => {
    // Check for existing token
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${tokenToVerify}` }
      });
      
      if (response.ok) {
        setToken(tokenToVerify);
        setIsLoggedIn(true);
        fetchContent(tokenToVerify);
        fetchInquiries(tokenToVerify);
        fetchVolunteers(tokenToVerify);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (response.ok && result.data) {
        localStorage.setItem('adminToken', result.data.token);
        setToken(result.data.token);
        setIsLoggedIn(true);
        fetchContent(result.data.token);
        fetchInquiries(result.data.token);
        fetchVolunteers(result.data.token);
      } else {
        setLoginError(result.error || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setContent(null);
  };

  const fetchContent = async (authToken) => {
    try {
      const response = await fetch('/api/content');
      const result = await response.json();
      if (result.data) {
        setContent(result.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchInquiries = async (authToken) => {
    try {
      const response = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const result = await response.json();
      if (result.data) {
        setInquiries(result.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const fetchVolunteers = async (authToken) => {
    try {
      const response = await fetch('/api/volunteers', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const result = await response.json();
      if (result.data) {
        setVolunteers(result.data);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const saveContent = async (section, data) => {
    setSaveStatus('saving');
    try {
      const response = await fetch(`/api/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        setSaveStatus('saved');
        setContent(prev => ({ ...prev, [section]: data }));
        setTimeout(() => setSaveStatus(''), 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const updateVolunteerStatus = async (id, status) => {
    try {
      await fetch(`/api/volunteers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  const handleEditSave = () => {
    const { type, data, index } = editDialog;
    
    if (type === 'hero' || type === 'about' || type === 'donation' || type === 'contact') {
      saveContent(type, data);
    } else if (type === 'program' || type === 'stat' || type === 'team' || type === 'testimonial' || type === 'event' || type === 'gallery' || type === 'blog') {
      const sectionKey = type + 's';
      const currentItems = [...(content[sectionKey] || [])];
      if (index !== null) {
        currentItems[index] = data;
      } else {
        currentItems.push({ ...data, id: uuidv4() });
      }
      saveContent(sectionKey, currentItems);
    }
    
    setEditDialog({ open: false, type: '', data: null, index: null });
  };

  const handleDelete = (type, index) => {
    const sectionKey = type + 's';
    const currentItems = [...(content[sectionKey] || [])];
    currentItems.splice(index, 1);
    saveContent(sectionKey, currentItems);
  };

  // Loading state
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

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Tamohar Foundation Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm text-center">{loginError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...</>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
              <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Default credentials:</strong><br />
                  Email: admin@tamoharfoundation.org<br />
                  Password: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'hero', icon: Home, label: 'Hero Section' },
    { id: 'about', icon: FileText, label: 'About' },
    { id: 'programs', icon: Heart, label: 'Programs' },
    { id: 'stats', icon: Users, label: 'Stats' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'gallery', icon: Image, label: 'Gallery' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'donation', icon: Heart, label: 'Donation' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'inquiries', icon: Mail, label: 'Inquiries' },
    { id: 'volunteers', icon: UserPlus, label: 'Volunteers' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-xl fixed h-full overflow-y-auto z-10"
      >
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Tamohar</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-sky-500 text-white'
                      : 'text-gray-600 hover:bg-sky-50 hover:text-sky-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('_', ' ')}</h1>
            <p className="text-gray-500">Manage your website content</p>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus && (
              <Badge className={saveStatus === 'saved' ? 'bg-green-500' : saveStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'}>
                {saveStatus === 'saved' ? 'Saved!' : saveStatus === 'saving' ? 'Saving...' : 'Error'}
              </Badge>
            )}
            <a href="/" target="_blank">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" /> View Site
              </Button>
            </a>
          </div>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Programs</p>
                    <p className="text-3xl font-bold text-sky-500">{content?.programs?.length || 0}</p>
                  </div>
                  <Heart className="w-12 h-12 text-sky-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Events</p>
                    <p className="text-3xl font-bold text-sky-500">{content?.events?.length || 0}</p>
                  </div>
                  <Calendar className="w-12 h-12 text-sky-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Inquiries</p>
                    <p className="text-3xl font-bold text-sky-500">{inquiries.length}</p>
                  </div>
                  <Mail className="w-12 h-12 text-sky-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Volunteers</p>
                    <p className="text-3xl font-bold text-sky-500">{volunteers.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-sky-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Hero Section Editor */}
        {activeTab === 'hero' && content?.hero && (
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the main hero section of your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  value={content.hero.title || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Subtitle</label>
                <Input
                  value={content.hero.subtitle || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={content.hero.description || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input
                  value={content.hero.image || ''}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                />
                {content.hero.image && (
                  <img src={content.hero.image} alt="Hero preview" className="mt-2 w-full max-w-md h-40 object-cover rounded-lg" />
                )}
              </div>
              <Button onClick={() => saveContent('hero', content.hero)} className="bg-sky-500 hover:bg-sky-600">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* About Section Editor */}
        {activeTab === 'about' && content?.about && (
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Edit your organization's story, mission, and vision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  value={content.about.title || ''}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Our Story</label>
                <Textarea
                  value={content.about.story || ''}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, story: e.target.value } })}
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mission</label>
                <Textarea
                  value={content.about.mission || ''}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Vision</label>
                <Textarea
                  value={content.about.vision || ''}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, vision: e.target.value } })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input
                  value={content.about.image || ''}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, image: e.target.value } })}
                />
              </div>
              <Button onClick={() => saveContent('about', content.about)} className="bg-sky-500 hover:bg-sky-600">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Programs Editor */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Programs</h2>
                <p className="text-gray-500">Manage your organization's programs</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'program',
                  data: { title: '', description: '', icon: 'Heart', image: '', impact: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Program
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.programs?.map((program, index) => (
                <Card key={program.id || index}>
                  <div className="h-40 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{program.description}</p>
                    <Badge variant="secondary" className="mb-4">{program.impact}</Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'program', data: program, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('program', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Stats Editor */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Impact Stats</h2>
                <p className="text-gray-500">Manage your impact statistics</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'stat',
                  data: { number: '', label: '', icon: 'Heart' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Stat
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content?.stats?.map((stat, index) => (
                <Card key={stat.id || index}>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-sky-500 mb-2">{stat.number}</p>
                    <p className="text-gray-600 mb-4">{stat.label}</p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'stat', data: stat, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('stat', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Team Editor */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Team Members</h2>
                <p className="text-gray-500">Manage your team members</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'team',
                  data: { name: '', role: '', bio: '', image: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Member
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.team?.map((member, index) => (
                <Card key={member.id || index}>
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-sky-500 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{member.bio}</p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'team', data: member, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('team', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Editor */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Testimonials</h2>
                <p className="text-gray-500">Manage success stories and testimonials</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'testimonial',
                  data: { name: '', role: '', quote: '', image: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Testimonial
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.testimonials?.map((testimonial, index) => (
                <Card key={testimonial.id || index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">"{testimonial.quote}"</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'testimonial', data: testimonial, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('testimonial', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Events Editor */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Events</h2>
                <p className="text-gray-500">Manage upcoming events</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'event',
                  data: { title: '', date: '', location: '', description: '', image: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Event
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content?.events?.map((event, index) => (
                <Card key={event.id || index}>
                  <div className="h-40 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500 mb-2 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'event', data: event, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('event', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Editor */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Gallery</h2>
                <p className="text-gray-500">Manage photo gallery</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'gallery',
                  data: { image: '', caption: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content?.gallery?.map((item, index) => (
                <Card key={item.id || index} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{item.caption}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'gallery', data: item, index })}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('gallery', index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Editor */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Blogs</h2>
                <p className="text-gray-500">Manage blog posts</p>
              </div>
              <Button
                onClick={() => setEditDialog({
                  open: true,
                  type: 'blog',
                  data: { title: '', excerpt: '', content: '', author: '', date: new Date().toISOString().split('T')[0], image: '', category: '' },
                  index: null
                })}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Blog
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content?.blogs?.map((blog, index) => (
                <Card key={blog.id || index}>
                  <div className="h-40 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{blog.category}</Badge>
                    <h3 className="font-semibold mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{blog.excerpt}</p>
                    <p className="text-sm text-gray-500 mb-4">By {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditDialog({ open: true, type: 'blog', data: blog, index })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete('blog', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Donation Section Editor */}
        {activeTab === 'donation' && content?.donation && (
          <Card>
            <CardHeader>
              <CardTitle>Donation Section</CardTitle>
              <CardDescription>Edit donation information and bank details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  value={content.donation.title || ''}
                  onChange={(e) => setContent({ ...content, donation: { ...content.donation, title: e.target.value } })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={content.donation.description || ''}
                  onChange={(e) => setContent({ ...content, donation: { ...content.donation, description: e.target.value } })}
                  rows={3}
                />
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Bank Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bank Name</label>
                    <Input
                      value={content.donation.bankDetails?.bankName || ''}
                      onChange={(e) => setContent({
                        ...content,
                        donation: {
                          ...content.donation,
                          bankDetails: { ...content.donation.bankDetails, bankName: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Name</label>
                    <Input
                      value={content.donation.bankDetails?.accountName || ''}
                      onChange={(e) => setContent({
                        ...content,
                        donation: {
                          ...content.donation,
                          bankDetails: { ...content.donation.bankDetails, accountName: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Number</label>
                    <Input
                      value={content.donation.bankDetails?.accountNumber || ''}
                      onChange={(e) => setContent({
                        ...content,
                        donation: {
                          ...content.donation,
                          bankDetails: { ...content.donation.bankDetails, accountNumber: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">IFSC Code</label>
                    <Input
                      value={content.donation.bankDetails?.ifscCode || ''}
                      onChange={(e) => setContent({
                        ...content,
                        donation: {
                          ...content.donation,
                          bankDetails: { ...content.donation.bankDetails, ifscCode: e.target.value }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">UPI ID</label>
                    <Input
                      value={content.donation.bankDetails?.upiId || ''}
                      onChange={(e) => setContent({
                        ...content,
                        donation: {
                          ...content.donation,
                          bankDetails: { ...content.donation.bankDetails, upiId: e.target.value }
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Contact for Donation</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Email</label>
                    <Input
                      value={content.donation.contactEmail || ''}
                      onChange={(e) => setContent({ ...content, donation: { ...content.donation, contactEmail: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Phone</label>
                    <Input
                      value={content.donation.contactPhone || ''}
                      onChange={(e) => setContent({ ...content, donation: { ...content.donation, contactPhone: e.target.value } })}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={() => saveContent('donation', content.donation)} className="bg-sky-500 hover:bg-sky-600">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Section Editor */}
        {activeTab === 'contact' && content?.contact && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Edit your organization's contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <Textarea
                  value={content.contact.address || ''}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                  rows={2}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    value={content.contact.email || ''}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input
                    value={content.contact.phone || ''}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                  />
                </div>
              </div>
              <Button onClick={() => saveContent('contact', content.contact)} className="bg-sky-500 hover:bg-sky-600">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Inquiries List */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact Inquiries</h2>
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No inquiries yet
                  </CardContent>
                </Card>
              ) : (
                inquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{inquiry.name}</h3>
                            <Badge className={
                              inquiry.status === 'new' ? 'bg-green-500' :
                              inquiry.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                            }>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{inquiry.email} • {inquiry.phone}</p>
                          <p className="text-sm text-sky-500 mb-2">{inquiry.subject}</p>
                          <p className="text-gray-600">{inquiry.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(inquiry.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => updateInquiryStatus(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Volunteers List */}
        {activeTab === 'volunteers' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Volunteer Applications</h2>
            <div className="space-y-4">
              {volunteers.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    No volunteer applications yet
                  </CardContent>
                </Card>
              ) : (
                volunteers.map((volunteer) => (
                  <Card key={volunteer.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{volunteer.name}</h3>
                            <Badge className={
                              volunteer.status === 'pending' ? 'bg-yellow-500' :
                              volunteer.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                            }>
                              {volunteer.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{volunteer.email} • {volunteer.phone}</p>
                          <p className="text-sm mb-1"><strong>Skills:</strong> {volunteer.skills}</p>
                          <p className="text-sm mb-1"><strong>Availability:</strong> {volunteer.availability}</p>
                          <p className="text-gray-600 mt-2">{volunteer.motivation}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Applied: {new Date(volunteer.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <Select
                          value={volunteer.status}
                          onValueChange={(value) => updateVolunteerStatus(volunteer.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => !open && setEditDialog({ open: false, type: '', data: null, index: null })}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editDialog.index !== null ? 'Edit' : 'Add'} {editDialog.type?.charAt(0).toUpperCase() + editDialog.type?.slice(1)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Program Form */}
            {editDialog.type === 'program' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editDialog.data.title || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, title: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editDialog.data.description || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, description: e.target.value } })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Select
                    value={editDialog.data.icon || 'Heart'}
                    onValueChange={(value) => setEditDialog({ ...editDialog, data: { ...editDialog.data, icon: value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="GraduationCap">Education</SelectItem>
                      <SelectItem value="Stethoscope">Healthcare</SelectItem>
                      <SelectItem value="TreeDeciduous">Environment</SelectItem>
                      <SelectItem value="Baby">Child Welfare</SelectItem>
                      <SelectItem value="Home">Rural Development</SelectItem>
                      <SelectItem value="Users">Community</SelectItem>
                      <SelectItem value="HandHeart">Empowerment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Impact (e.g., "15,000+ students educated")</label>
                  <Input
                    value={editDialog.data.impact || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, impact: e.target.value } })}
                  />
                </div>
              </>
            )}

            {/* Stat Form */}
            {editDialog.type === 'stat' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Number (e.g., "50,000+")</label>
                  <Input
                    value={editDialog.data.number || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, number: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Label</label>
                  <Input
                    value={editDialog.data.label || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, label: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Select
                    value={editDialog.data.icon || 'Heart'}
                    onValueChange={(value) => setEditDialog({ ...editDialog, data: { ...editDialog.data, icon: value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="MapPin">Location</SelectItem>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="HandHeart">Volunteers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Team Form */}
            {editDialog.type === 'team' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editDialog.data.name || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, name: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Input
                    value={editDialog.data.role || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, role: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={editDialog.data.bio || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, bio: e.target.value } })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
              </>
            )}

            {/* Testimonial Form */}
            {editDialog.type === 'testimonial' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editDialog.data.name || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, name: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role/Description</label>
                  <Input
                    value={editDialog.data.role || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, role: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Quote</label>
                  <Textarea
                    value={editDialog.data.quote || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, quote: e.target.value } })}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
              </>
            )}

            {/* Event Form */}
            {editDialog.type === 'event' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editDialog.data.title || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, title: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={editDialog.data.date?.split('T')[0] || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, date: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={editDialog.data.location || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, location: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editDialog.data.description || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, description: e.target.value } })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
              </>
            )}

            {/* Gallery Form */}
            {editDialog.type === 'gallery' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Caption</label>
                  <Input
                    value={editDialog.data.caption || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, caption: e.target.value } })}
                  />
                </div>
              </>
            )}

            {/* Blog Form */}
            {editDialog.type === 'blog' && editDialog.data && (
              <>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editDialog.data.title || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, title: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={editDialog.data.category || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, category: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Excerpt</label>
                  <Textarea
                    value={editDialog.data.excerpt || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, excerpt: e.target.value } })}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={editDialog.data.content || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, content: e.target.value } })}
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Author</label>
                    <Input
                      value={editDialog.data.author || ''}
                      onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, author: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={editDialog.data.date?.split('T')[0] || ''}
                      onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, date: e.target.value } })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editDialog.data.image || ''}
                    onChange={(e) => setEditDialog({ ...editDialog, data: { ...editDialog.data, image: e.target.value } })}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog({ open: false, type: '', data: null, index: null })}>
              Cancel
            </Button>
            <Button onClick={handleEditSave} className="bg-sky-500 hover:bg-sky-600">
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
