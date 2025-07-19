import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sambhav Foundation - Empowering Lives Through Education',
  description: 'Transforming lives through education, healthcare, and sustainable livelihood programs. Join us in building bridges to brighter futures.',
  keywords: ['education', 'skill development', 'foundation', 'training', 'employment', 'NGO', 'India'],
  authors: [{ name: 'Sambhav Foundation' }],
  openGraph: {
    title: 'Sambhav Foundation - Empowering Lives Through Education',
    description: 'Transforming lives through education, healthcare, and sustainable livelihood programs.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sambhav Foundation - Empowering Lives Through Education',
    description: 'Transforming lives through education, healthcare, and sustainable livelihood programs.',
  },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="landing-layout">
      {children}
    </div>
  )
} 