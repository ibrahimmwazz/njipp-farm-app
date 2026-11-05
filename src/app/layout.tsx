import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NJIPP KONSULT LTD — Enterprise Management Portal',
  description: 'Integrated Farm, Transport Services & Multi-Venture ERP Portal for NJIPP KONSULT LTD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
