import { NextRequest, NextResponse } from 'next/server';
import { getQueries, addQuery } from '@/lib/db';

export async function GET(_req: NextRequest) {
  try {
    const queries = await getQueries();
    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Error in GET /api/queries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields: name, message' }, { status: 400 });
    }

    const newQuery = await addQuery({
      name,
      email: email || '',
      phone: phone || '',
      message,
    });

    return NextResponse.json({ query: newQuery }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/queries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
