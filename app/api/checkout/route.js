import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Live Checkout is disabled in this demo. Persistent request locking and a verified Stripe webhook are required before accepting payments.',
    },
    { status: 503 },
  );
}
