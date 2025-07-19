"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Image } from 'lucide-react';

const Mission: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Our <span className="text-orange-400">Mission</span> &{' '}
                  <span className="text-teal-400">Vision</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe every individual deserves the opportunity to build a dignified life. 
                  Through comprehensive skill development and community support, we bridge 
                  the gap between potential and opportunity.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed pl-13">
                  To empower marginalized communities through quality education, skill 
                  development, and sustainable livelihood opportunities that create lasting 
                  social impact.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed pl-13">
                  A society where every person has access to opportunities that enable them to 
                  achieve their full potential and contribute meaningfully to their communities.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Our Values</h3>
                </div>
                <p className="text-gray-300 leading-relaxed pl-13">
                  Compassion, integrity, and excellence guide everything we do. We believe in 
                  inclusive growth that respects dignity and promotes sustainable development.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Key Sectors Badge */}
              <div className="absolute -top-4 -right-4 z-10">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl px-4 py-3 shadow-lg shadow-teal-500/25">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm">Key Sectors</div>
                </div>
              </div>

              {/* Main Image Area */}
              <div className="relative bg-neutral-900 rounded-2xl aspect-[4/3] overflow-hidden border border-neutral-700">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-400 text-sm">Mission Visual</p>
                  </div>
                </div>

                {/* Years of Impact Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 left-8 bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-xl p-4 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-1">13+</div>
                    <div className="text-sm text-gray-300">Years of Impact</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission; 