import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoulSignal MCP',
  description: 'Prayer partner biometric insights platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}