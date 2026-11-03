import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const opportunities = {
  'google-it-support': {
    amount: 14900,
    name: 'Google IT Support Certificate',
    provider: 'Northstar Training Institute',
  },
  'cna-exam': {
    amount: 11500,
    name: 'Certified Nursing Assistant Exam',
    provider: 'Northstar Training Institute',
  },
  'comptia-a-plus': {
    amount: 15000,
    name: 'CompTIA A+ Certification',
    provider: 'Northstar Training Institute',
  },
  bookkeeping: {
    amount: 8900,
    name: 'Professional Bookkeeping Certificate',
    provider: 'Northstar Training Institute',
  },
};

export async function POST(req) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const connectedAccountId = process.env.STRIPE_CONNECTED_ACCOUNT_ID;

  if (!secretKey || !connectedAccountId) {
    return NextResponse.json(
      { error: 'Stripe Checkout requires STRIPE_SECRET_KEY and STRIPE_CONNECTED_ACCOUNT_ID.' },
      { status: 503 },
    );
  }

  let opportunityId;
  try {
    const formData = await req.formData();
    opportunityId = formData.get('opportunityId');
  } catch {
    return NextResponse.json({ error: 'A valid opportunity is required.' }, { status: 400 });
  }

  const opportunity = typeof opportunityId === 'string' ? opportunities[opportunityId] : null;
  if (!opportunity) {
    return NextResponse.json({ error: 'This opportunity is not available for sponsorship.' }, { status: 400 });
  }

  if (!connectedAccountId.startsWith('acct_')) {
    return NextResponse.json({ error: 'STRIPE_CONNECTED_ACCOUNT_ID must be a Stripe connected account ID.' }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const origin = req.nextUrl.origin;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    client_reference_id: opportunityId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: opportunity.amount,
          product_data: {
            name: opportunity.name,
            description: `Sponsorship paid directly to ${opportunity.provider}`,
          },
        },
      },
    ],
    payment_intent_data: {
      transfer_data: { destination: connectedAccountId },
      metadata: { opportunity_id: opportunityId },
    },
    metadata: { opportunity_id: opportunityId },
    success_url: `${origin}/?success=true&request=${encodeURIComponent(opportunityId)}`,
    cancel_url: `${origin}/?canceled=true`,
  });

  return NextResponse.redirect(session.url, 303);
}
