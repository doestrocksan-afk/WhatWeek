import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhatWeek.uk — What Week Is It?',
  description: 'What week is it in the UK? Current week number with bank holidays for England, Scotland, Wales and Northern Ireland.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
