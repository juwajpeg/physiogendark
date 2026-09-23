import { NextRequest, NextResponse } from 'next/server';
import { getDoctors, addDoctor } from '@/lib/db';
import { uploadImage, ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIZE } from '@/lib/cloudinary';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';
    const doctors = await getDoctors(activeOnly);
    return NextResponse.json({ doctors });
  } catch (error) {
    console.error('Error in GET /api/doctors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      qualification,
      specialization,
      role,
      credentials,
      image,
      schedule,
      gender,
      experience,
      consultationFee,
      bio,
      appointmentDuration
    } = body;

    if (!name || !qualification || !specialization) {
      return NextResponse.json({ error: 'Missing required fields: name, qualification, specialization' }, { status: 400 });
    }

    let imageUrl = '';
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

    const newDoctor = await addDoctor({
      name,
      email: email || '',
      phone: phone || '',
      qualification,
      specialization,
      role: role || 'doctor',
      credentials: Array.isArray(credentials) ? credentials.join(', ') : (credentials || ''),
      image: imageUrl,
      schedule,
      gender: gender || '',
      experience: experience || '',
      consultationFee: consultationFee || '',
      bio: bio || '',
      appointmentDuration: appointmentDuration || '30 min',
    });

    return NextResponse.json({ doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/doctors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
