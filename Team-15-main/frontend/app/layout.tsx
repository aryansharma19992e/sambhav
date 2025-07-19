import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sambhav Foundation',
  description: 'Empowering Lives Through Education',
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
