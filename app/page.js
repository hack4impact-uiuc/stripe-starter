import OpportunityApp from './components/OpportunityApp';

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <OpportunityApp
      checkoutEnabled={Boolean(
        process.env.STRIPE_SECRET_KEY && process.env.STRIPE_CONNECTED_ACCOUNT_ID,
      )}
      paymentStatus={params?.success ? 'success' : params?.canceled ? 'canceled' : null}
      requestId={params?.request ?? ''}
    />
  );
}
