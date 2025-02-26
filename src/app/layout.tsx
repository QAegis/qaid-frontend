import { AuthProvider } from '@/hooks/useAuth';
import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QAID Platform',
  description: 'Quality AI-Driven Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}