import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@physiogen.fit';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'PhysiogenAdmin2026!';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword) {
      // In a real session, we can issue an HMAC token or simple token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      return NextResponse.json({ success: true, token, user: { email: expectedEmail, role: 'admin' } });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Error in /api/admin/login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
