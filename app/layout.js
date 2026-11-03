import './globals.css';

export const metadata = {
  title: 'Stepwise — Make your next move possible',
  description:
    'Fund a career credential, help someone take their next step, and follow the outcome.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
