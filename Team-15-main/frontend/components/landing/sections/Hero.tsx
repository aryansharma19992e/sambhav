"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, Users, Award, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-teal-900/20 to-orange-900/20"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D97706;stop-opacity:0.1" /><stop offset="100%" style="stop-color:%23059669;stop-opacity:0.1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23grad1)"/></svg>')`,
            backgroundColor: '#000000'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          
          {/* Mission Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-200 text-sm font-medium mb-8"
          >
            <Heart className="w-4 h-4 mr-2" />
            Empowering Marginalized Communities Since 2008
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Building Bridges to
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Brighter Futures
            </span>
          </motion.h1>

          {/* Supporting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Sambhav Foundation transforms lives through education, healthcare, and sustainable 
            livelihood programs. We believe every person deserves the opportunity to thrive, 
            regardless of their background or circumstances.
          </motion.p>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-gray-300 text-lg">Training Centers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">25,000+</div>
              <div className="text-gray-300 text-lg">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">85%</div>
              <div className="text-gray-300 text-lg">Placement Rate</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 group"
              >
                <Users className="mr-2 w-5 h-5" />
                Join Our Mission
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-teal-500/25 group"
              >
                <Heart className="mr-2 w-5 h-5" />
                Donate Now
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-sm">ISO 9001:2015 Certified</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-400" />
              <span className="text-sm">NSDC Partner</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span className="text-sm">Government Recognized</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-orange-400 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-orange-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 