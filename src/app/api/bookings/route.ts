import { NextRequest, NextResponse } from 'next/server';
import { getBookings, addBooking } from '@/lib/db';
import type { BookingStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = (searchParams.get('status') as BookingStatus) || undefined;
    const doctorId = searchParams.get('doctorId') || undefined;
    const date = searchParams.get('date') || undefined;
    
    const bookings = await getBookings({ status, doctorId, date });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error in GET /api/bookings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { doctorId, doctorName, clientName, clientEmail, clientPhone, date, timeSlot } = body;

    if (!doctorId || !doctorName || !clientName || !clientEmail || !clientPhone || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const newBooking = await addBooking({
      doctorId,
      doctorName,
      clientName,
      clientEmail,
      clientPhone,
      date,
      timeSlot,
    });

    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bookings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
