# Sambhav Foundation - Project Structure

## Overview

This Next.js application features a clean, organized structure with the Sambhav Foundation landing page properly separated and modularized.

## Directory Structure

```
sambhavfoundation/Team-15/frontend/
├── app/                          # Next.js 13+ App Router
│   ├── (landing)/               # Landing page route group
│   │   ├── layout.tsx           # Landing-specific layout & metadata
│   │   └── page.tsx             # Main landing page
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── student-dashboard/       # Student dashboard
│   ├── center-admin/           # Admin dashboard
│   ├── counsellor/             # Counsellor dashboard
│   ├── company/                # Company dashboard
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles with dark theme
├── components/                  # Reusable components
│   ├── landing/                # Landing page components
│   │   ├── sections/           # Main page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Mission.tsx
│   │   │   ├── ImpactStats.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── ContactFooter.tsx
│   │   │   └── index.ts
│   │   ├── shared/             # Shared landing components
│   │   │   ├── SplashCursor.tsx
│   │   │   └── index.ts
│   │   ├── index.ts            # Main exports
│   │   └── README.md           # Landing components documentation
│   ├── ui/                     # Shadcn/ui components
│   ├── auth-guard.tsx          # Authentication guard
│   └── theme-provider.tsx      # Theme provider
├── lib/                        # Utility functions
├── hooks/                      # Custom React hooks
├── styles/                     # Additional styles
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## Route Structure

### Landing Page Route Group - `(landing)`
- **Path**: `/` (root)
- **Layout**: `app/(landing)/layout.tsx`
- **Page**: `app/(landing)/page.tsx`
- **Features**: 
  - Dedicated SEO metadata
  - Landing-specific styling
  - Component composition

### Other Routes
- **Login**: `/login` - User authentication
- **Signup**: `/signup` - User registration
- **Student Dashboard**: `/student-dashboard` - Student interface
- **Admin Dashboards**: Various admin interfaces

## Component Architecture

### Landing Page Components

**Organized Structure:**
```
@/components/landing/
├── sections/     # Page sections (Hero, Mission, etc.)
└── shared/       # Reusable components (SplashCursor, etc.)
```

**Import Usage:**
```tsx
import { 
  Hero, 
  Mission, 
  ImpactStats, 
  Programs, 
  ContactFooter, 
  SplashCursor 
} from '@/components/landing';
```

### Styling Architecture

**Dark Theme Implementation:**
- Pure black background (`#000000`)
- Orange/teal accent colors
- Inter font family
- Responsive design patterns
- Framer Motion animations

**CSS Structure:**
```css
/* Root variables for consistent theming */
:root {
  --background: 0 0% 0%;         /* Pure black */
  --foreground: 0 0% 98%;        /* Pure white */
  --accent: orange/teal variants
}
```

## Key Features

### 🎨 **Design System**
- **Pure black theme** with orange/teal accents
- **Consistent typography** using Inter font
- **Responsive design** for all screen sizes
- **Smooth animations** with Framer Motion

### 🏗️ **Architecture**
- **Route groups** for organized page structure
- **Component separation** by functionality
- **Clean exports** with index files
- **TypeScript** for type safety

### 🚀 **Performance**
- **Next.js 13+ App Router** for optimized routing
- **Component lazy loading** where applicable
- **Optimized animations** with Framer Motion
- **SEO optimization** with proper metadata

### 📱 **Responsive**
- **Mobile-first** design approach
- **Flexible grid systems** using Tailwind CSS
- **Adaptive typography** scaling
- **Touch-friendly** interactions

## Development

### Running the Project
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # Code linting
```

### Adding New Landing Components
1. Create component in appropriate directory:
   - `components/landing/sections/` for page sections
   - `components/landing/shared/` for reusable components
2. Export from local `index.ts`
3. Component automatically available via main export

### Customization
- **Colors**: Update CSS variables in `globals.css`
- **Fonts**: Modify font imports in `globals.css`
- **Animations**: Adjust Framer Motion configs in components
- **Layout**: Modify component structure in `(landing)/page.tsx`

## Dependencies

### Core
- **Next.js 15+** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library

### UI Components
- **Shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Radix UI** - Headless component primitives

This structure ensures maintainability, scalability, and clean separation of concerns while providing an excellent developer experience. 