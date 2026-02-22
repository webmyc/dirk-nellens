import { NextRequest, NextResponse } from 'next/server';
import { calculateChart } from '@/lib/human-design';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, birthDate, birthTime, timezone, location, unknownBirthTime } = body ?? {};

    if (!name || !birthDate || !timezone || !location) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!unknownBirthTime && !birthTime) {
      return NextResponse.json({ error: 'Birth time is required unless unknown birth time is selected.' }, { status: 400 });
    }

    const chart = calculateChart({
      name,
      birthDate,
      birthTime: birthTime || '12:00',
      timezone,
      location,
      unknownBirthTime: !!unknownBirthTime,
    });

    return NextResponse.json({ chart });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to calculate chart.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
