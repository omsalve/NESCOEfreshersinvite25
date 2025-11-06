// app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'FY B.Tech Freshers 2025-26 | College of Engineering',
  description: "Step into the madness. The official freshers' party invite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} bg-gray-950 text-gray-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
