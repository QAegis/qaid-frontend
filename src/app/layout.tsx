import { AuthProvider } from '@/hooks/useAuth';
import { Poppins } from "next/font/google";
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/store/provider';
import LayoutWrapper from '@/components/LayoutWrapper';

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

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
      <body className={poppins.className}>
        <Providers>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
