# Stepwise

Stepwise connects learners who need flexible, job-ready credentials with sponsors who can fund them. The demo includes a browsable opportunity board, career-based course recommendations, a learner request form, course verification queue, and sponsor checkout.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add a Stripe **test-mode** secret key and the test-mode connected account ID of a participating provider.
4. Run `npm run dev` and open http://localhost:3000.

The fictional Northstar Training Institute account must be onboarded to your Connect platform. Checkout uses a destination charge, with the full sponsorship amount routed directly to that connected account. The server maps opportunity IDs to fixed prices; it does not accept a client-supplied amount.

Without both Stripe environment variables, browsing and the demo learner/provider flows still work, but live Checkout is disabled.

## Demo scope

Opportunities are sample listings. Learner requests, provider review decisions, and journey updates are held in browser memory and reset on refresh. The example does not include sign-in, a database, a Stripe webhook, duplicate-funding protection, actual course enrollment, or refunds.

Before accepting real payments, persist verified opportunities and funding state in a database, atomically reserve a request before creating Checkout Sessions, and use a verified Stripe webhook to confirm payment and update enrollment status. Do not treat a Checkout return URL as proof of payment. Keep fulfillment confirmation separate: only the provider can confirm enrollment or deliver an exam voucher.

To try a test payment, use Stripe's test card `4242 4242 4242 4242`, any future expiration date, and any CVC.
