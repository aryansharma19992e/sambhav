# Landing Page Components

This directory contains all components related to the Sambhav Foundation landing page.

## Structure

```
components/landing/
├── sections/           # Main page sections
│   ├── Hero.tsx           # Hero section with animations and CTAs
│   ├── Mission.tsx        # Mission, Vision, and Values section
│   ├── ImpactStats.tsx    # Statistics and impact numbers
│   ├── Programs.tsx       # Training programs showcase
│   ├── ContactFooter.tsx  # Contact form and footer
│   └── index.ts           # Section components exports
├── shared/             # Shared/reusable components
│   ├── SplashCursor.tsx   # Interactive cursor effect
│   └── index.ts           # Shared components exports
├── index.ts            # Main exports file
└── README.md           # This file
```

## Components Overview

### Section Components (`./sections/`)

**Hero** - The main hero section featuring:
- Animated mission badge
- Gradient text headings
- Impact statistics preview
- Call-to-action buttons
- Scroll indicator animation

**Mission** - Mission, Vision, and Values section with:
- Side-by-side layout
- Icon-based content cards
- Visual elements with badges
- Smooth animations

**ImpactStats** - Statistics showcase including:
- 4-column stats grid
- Animated counters
- Gradient stats bar
- Icon-based presentation

**Programs** - Training programs section with:
- Program cards with icons
- Key areas tags
- Call-to-action section
- Hover animations

**ContactFooter** - Contact and footer section featuring:
- Contact form with validation
- Contact information
- Office hours
- Social media links
- Footer with links

### Shared Components (`./shared/`)

**SplashCursor** - Interactive cursor effect (simplified version)
- Canvas-based implementation
- Responsive sizing
- Background positioning

## Usage

```tsx
import { 
  Hero, 
  Mission, 
  ImpactStats, 
  Programs, 
  ContactFooter, 
  SplashCursor 
} from '@/components/landing';

export default function LandingPage() {
  return (
    <main>
      <SplashCursor />
      <Hero />
      <Mission />
      <ImpactStats />
      <Programs />
      <ContactFooter />
    </main>
  );
}
```

## Styling

All components use:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Pure black theme** with orange/teal accents
- **Inter font** for typography
- **Responsive design** for all screen sizes

## Dependencies

- `framer-motion` - For animations
- `lucide-react` - For icons
- `@/components/ui/*` - Shadcn/ui components (Button, Card, Input, etc.) 