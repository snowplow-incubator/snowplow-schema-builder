import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import { Rubik } from 'next/font/google';
import "./globals.css"

export const metadata: Metadata = {
  title: 'Snowplow Tracking Planner',
  description: 'Create a Snowplow Tracking Plan',
}
const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
