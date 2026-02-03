import { NextResponse } from 'next/server';
import { connectToDatabase, getCollection } from '@/lib/db';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '@/lib/auth';
import { defaultContent } from '@/lib/seedData';
import { v4 as uuidv4 } from 'uuid';

// Helper to get path segments
function getPathSegments(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace('/api/', '').replace('/api', '');
  return pathname.split('/').filter(Boolean);
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Auth middleware helper
function authenticateRequest(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

// Initialize default content
async function initializeContent() {
  const contentCollection = await getCollection('content');
  const existingContent = await contentCollection.findOne({ type: 'site_content' });
  
  if (!existingContent) {
    await contentCollection.insertOne({
      type: 'site_content',
      ...defaultContent,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  // Initialize admin user if not exists
  const usersCollection = await getCollection('users');
  const existingAdmin = await usersCollection.findOne({ email: 'admin@tamoharfoundation.org' });
  
  if (!existingAdmin) {
    const hashedPassword = await hashPassword('admin123');
    await usersCollection.insertOne({
      id: uuidv4(),
      email: 'admin@tamoharfoundation.org',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date()
    });
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET handler
export async function GET(request) {
  try {
    const segments = getPathSegments(request);
    
    // Health check
    if (segments[0] === 'health') {
      return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }, { headers: corsHeaders });
    }
    
    // Get all content
    if (segments[0] === 'content') {
      await initializeContent();
      const contentCollection = await getCollection('content');
      const content = await contentCollection.findOne({ type: 'site_content' });
      
      if (segments[1]) {
        // Get specific section
        const section = segments[1];
        if (content && content[section]) {
          return NextResponse.json({ data: content[section] }, { headers: corsHeaders });
        }
        return NextResponse.json({ error: 'Section not found' }, { status: 404, headers: corsHeaders });
      }
      
      return NextResponse.json({ data: content }, { headers: corsHeaders });
    }
    
    // Get inquiries (admin only)
    if (segments[0] === 'inquiries') {
      const user = authenticateRequest(request);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
      }
      
      const inquiriesCollection = await getCollection('inquiries');
      const inquiries = await inquiriesCollection.find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ data: inquiries }, { headers: corsHeaders });
    }
    
    // Get volunteers (admin only)
    if (segments[0] === 'volunteers') {
      const user = authenticateRequest(request);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
      }
      
      const volunteersCollection = await getCollection('volunteers');
      const volunteers = await volunteersCollection.find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ data: volunteers }, { headers: corsHeaders });
    }
    
    // Verify auth
    if (segments[0] === 'auth' && segments[1] === 'verify') {
      const user = authenticateRequest(request);
      if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401, headers: corsHeaders });
      }
      
      const usersCollection = await getCollection('users');
      const dbUser = await usersCollection.findOne({ id: user.userId });
      if (!dbUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404, headers: corsHeaders });
      }
      
      return NextResponse.json({ 
        data: { 
          id: dbUser.id, 
          email: dbUser.email, 
          name: dbUser.name, 
          role: dbUser.role 
        } 
      }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

// POST handler
export async function POST(request) {
  try {
    const segments = getPathSegments(request);
    const body = await request.json();
    
    // Login
    if (segments[0] === 'auth' && segments[1] === 'login') {
      const { email, password } = body;
      
      await initializeContent();
      const usersCollection = await getCollection('users');
      const user = await usersCollection.findOne({ email });
      
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401, headers: corsHeaders });
      }
      
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401, headers: corsHeaders });
      }
      
      const token = generateToken(user.id);
      return NextResponse.json({ 
        data: { 
          token, 
          user: { id: user.id, email: user.email, name: user.name, role: user.role } 
        } 
      }, { headers: corsHeaders });
    }
    
    // Contact form submission
    if (segments[0] === 'contact') {
      const { name, email, phone, subject, message } = body;
      
      const inquiriesCollection = await getCollection('inquiries');
      const inquiry = {
        id: uuidv4(),
        name,
        email,
        phone,
        subject,
        message,
        status: 'new',
        createdAt: new Date()
      };
      
      await inquiriesCollection.insertOne(inquiry);
      return NextResponse.json({ data: { message: 'Thank you for contacting us!' } }, { headers: corsHeaders });
    }
    
    // Volunteer registration
    if (segments[0] === 'volunteer') {
      const { name, email, phone, skills, availability, motivation } = body;
      
      const volunteersCollection = await getCollection('volunteers');
      const volunteer = {
        id: uuidv4(),
        name,
        email,
        phone,
        skills,
        availability,
        motivation,
        status: 'pending',
        createdAt: new Date()
      };
      
      await volunteersCollection.insertOne(volunteer);
      return NextResponse.json({ data: { message: 'Thank you for your interest in volunteering!' } }, { headers: corsHeaders });
    }
    
    // Newsletter subscription
    if (segments[0] === 'newsletter') {
      const { email } = body;
      
      const newsletterCollection = await getCollection('newsletter');
      const existing = await newsletterCollection.findOne({ email });
      
      if (existing) {
        return NextResponse.json({ data: { message: 'You are already subscribed!' } }, { headers: corsHeaders });
      }
      
      await newsletterCollection.insertOne({
        id: uuidv4(),
        email,
        subscribedAt: new Date()
      });
      
      return NextResponse.json({ data: { message: 'Thank you for subscribing!' } }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

// PUT handler (for content updates - admin only)
export async function PUT(request) {
  try {
    const user = authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }
    
    const segments = getPathSegments(request);
    const body = await request.json();
    
    // Update content section
    if (segments[0] === 'content' && segments[1]) {
      const section = segments[1];
      const contentCollection = await getCollection('content');
      
      const updateData = {
        [section]: body.data,
        updatedAt: new Date()
      };
      
      await contentCollection.updateOne(
        { type: 'site_content' },
        { $set: updateData }
      );
      
      return NextResponse.json({ data: { message: 'Content updated successfully' } }, { headers: corsHeaders });
    }
    
    // Update inquiry status
    if (segments[0] === 'inquiries' && segments[1]) {
      const inquiriesCollection = await getCollection('inquiries');
      await inquiriesCollection.updateOne(
        { id: segments[1] },
        { $set: { status: body.status, updatedAt: new Date() } }
      );
      return NextResponse.json({ data: { message: 'Inquiry updated' } }, { headers: corsHeaders });
    }
    
    // Update volunteer status
    if (segments[0] === 'volunteers' && segments[1]) {
      const volunteersCollection = await getCollection('volunteers');
      await volunteersCollection.updateOne(
        { id: segments[1] },
        { $set: { status: body.status, updatedAt: new Date() } }
      );
      return NextResponse.json({ data: { message: 'Volunteer updated' } }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

// DELETE handler (admin only)
export async function DELETE(request) {
  try {
    const user = authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }
    
    const segments = getPathSegments(request);
    
    // Delete inquiry
    if (segments[0] === 'inquiries' && segments[1]) {
      const inquiriesCollection = await getCollection('inquiries');
      await inquiriesCollection.deleteOne({ id: segments[1] });
      return NextResponse.json({ data: { message: 'Inquiry deleted' } }, { headers: corsHeaders });
    }
    
    // Delete volunteer
    if (segments[0] === 'volunteers' && segments[1]) {
      const volunteersCollection = await getCollection('volunteers');
      await volunteersCollection.deleteOne({ id: segments[1] });
      return NextResponse.json({ data: { message: 'Volunteer deleted' } }, { headers: corsHeaders });
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
