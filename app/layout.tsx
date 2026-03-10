import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Birthday Sousou! 🎮',
  description: 'An epic interactive birthday experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
