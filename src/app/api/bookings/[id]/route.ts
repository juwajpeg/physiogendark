import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus } from '@/lib/db';
import { BookingStatus } from '@/lib/types';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ booking });
  } catch (error) {
    console.error(`Error in GET /api/bookings/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { status } = body;

    if (status !== 'Confirmed' && status !== 'Cancelled') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const booking = await updateBookingStatus(id, status as BookingStatus);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error(`Error in PATCH /api/bookings/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
