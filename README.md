# NextStep

NextStep is a hackathon demo for funding verified career courses for low-wage workers. It demonstrates the PRD's learner → admin → sponsor → provider journey with one sponsor, one request, and one provider.

## Run locally

1. Install dependencies with `npm install`.
2. Run `npm run dev`.
3. Open http://localhost:3000.

No Stripe account or environment variables are needed for the demo.

## Three-minute demo walkthrough

Use the **Student / Sponsor** switch in the top-right to change the main view. The sidebar only shows the screens for the selected role. Admin and provider screens are separate **Demo tools** in the sidebar.

1. **Student:** Take the career, weekly study-time, and budget quiz, then request a course. New requests start in `pending_review`.
2. **Admin demo tool:** Review the new request, confirm or adjust the price, then approve and publish it—or enter a reason and decline it.
3. **Sponsor:** Switch roles, filter verified requests by career field, cost, or deadline, then open a request and choose **Fund this certification**. The request becomes locked while the simulated checkout is open. Complete or cancel checkout to see the funded or reopened state.
4. **Provider demo tool:** Enter a voucher or enrollment reference and confirm enrollment—or record that the provider cannot fulfill the request.
5. **Sponsor:** Open **My impact** to see paid, enrollment-confirmed, completed, or refunded outcomes. Mark an enrolled course completed from the student or provider view.

The seeded Maya request is a $150 CompTIA A+ exam voucher awaiting admin review. The other sample opportunities are already verified and open to sponsors.

## Demo limitations and Stripe integration

All data is in browser memory and resets on refresh. The checkout and refund actions are explicitly simulated: no card is charged, no funds are transferred, and no refund is issued. The `/api/checkout` endpoint intentionally returns `503` so the prototype cannot accept a real payment without the required safeguards. A demo success is not a Stripe payment confirmation.

The PRD's real payment flow still needs persistent storage and atomic `open → locked` updates, a 30-minute Checkout Session, Stripe Connect provider onboarding and destination charges, a signature-verified webhook with duplicate-event protection, and refund transfer reversal if a provider cannot fulfill. Only a verified webhook may mark a real request funded; only the provider may confirm real enrollment. Add those pieces before enabling live or test-mode payments.

The demo has a $0 platform fee and uses the fictional Northstar Training Institute provider.
