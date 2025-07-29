import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import { ChatProvider } from '@/lib/chat-context';
import { LiveChat } from '@/components/chat/live-chat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodelixVitae - AI-Powered Resume Builder',
  description: 'Create professional resumes with AI assistance. Build, optimize, and customize your resume for any job application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ChatProvider>
            {children}
            <LiveChat />
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
