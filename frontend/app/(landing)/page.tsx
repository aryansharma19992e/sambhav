import React from 'react';
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
    <main className="landing-page">
      <SplashCursor />
      <Hero />
      <Mission />
      <ImpactStats />
      <Programs />
      <ContactFooter />
    </main>
  );
} 