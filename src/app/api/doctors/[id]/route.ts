import { NextRequest, NextResponse } from 'next/server';
import { getDoctorById, updateDoctor, deleteDoctor } from '@/lib/db';
import { uploadImage, ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIZE } from '@/lib/cloudinary';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const doctor = await getDoctorById(id);
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json({ doctor });
  } catch (error) {
    console.error(`Error in GET /api/doctors/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { image, ...updates } = body;

    let imageUrl = updates.image;

    if (image) {
      const { base64, size, type } = typeof image === 'string' ? { base64: image, size: 0, type: '' } : image;

      if (size && size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: 'Image exceeds maximum size of 2MB' }, { status: 400 });
      }
      if (type && !ALLOWED_IMAGE_FORMATS.includes(type)) {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      }

      if (base64) {
        imageUrl = await uploadImage(base64, 'doctors');
      }
    }

    if (imageUrl) {
        updates.image = imageUrl;
    }

    const doctor = await updateDoctor(id, updates);
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    return NextResponse.json({ doctor });
  } catch (error) {
    console.error(`Error in PUT /api/doctors/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    await deleteDoctor(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE /api/doctors/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
