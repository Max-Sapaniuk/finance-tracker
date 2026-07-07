import type { Metadata } from 'next';
import { Instrument_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Body / UI type — Instrument Sans (variable weight 400–700)
const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
});

// Display & numeric type — Space Grotesk (variable weight 500–700)
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Track your net worth, portfolio, and transactions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
