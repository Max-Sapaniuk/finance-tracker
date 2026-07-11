import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/lib/utils';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Track your finances',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        spaceGrotesk.variable,
        'dark',
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarTrigger />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
