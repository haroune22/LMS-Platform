import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/ConfettiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS-Platform',
  description: 'Courses For Free',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ConfettiProvider/>
            <ToasterProvider/>
            {children}
            </body>
            {/* stripe listen --forward-to localhost:3000/api/14c35webhook */}
        </html>
      </ClerkProvider>
  )
}
