import { NextRequest, NextResponse } from 'next/server';
import { getInsightStats, getBookingTrend } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') as 'day' | 'month' || 'day';
    const date = searchParams.get('date') || undefined;
    
    const stats = await getInsightStats();
    const trend = await getBookingTrend(filter, date);
    
    return NextResponse.json({ stats, trend });
  } catch (error) {
    console.error('Error in GET /api/insights:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
