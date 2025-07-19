"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, TrendingUp, Award, Building2, Globe, ThumbsUp } from 'lucide-react';

const ImpactStats: React.FC = () => {
  const stats = [
    {
      icon: MapPin,
      number: "50+",
      title: "Training Centers",
      description: "Across multiple states in India",
      color: "orange"
    },
    {
      icon: Users,
      number: "10,000+",
      title: "Lives Transformed",
      description: "Through our comprehensive programs",
      color: "teal"
    },
    {
      icon: TrendingUp,
      number: "85%",
      title: "Placement Success",
      description: "Job placement rate for graduates",
      color: "orange"
    },
    {
      icon: Award,
      number: "5",
      title: "Training Sectors",
      description: "Beauty, IT, Banking, Construction, Manufacturing",
      color: "teal"
    }
  ];

  const bottomStats = [
    {
      icon: Building2,
      number: "500+",
      title: "Partner Organizations",
      color: "orange"
    },
    {
      icon: Globe,
      number: "25+",
      title: "States Covered",
      color: "amber"
    },
    {
      icon: ThumbsUp,
      number: "95%",
      title: "Trainee Satisfaction",
      color: "teal"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-orange-400">Impact</span> in Numbers
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every number represents a life changed, a family empowered, and a community 
              strengthened. See the tangible difference we're making together.
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:transform hover:scale-105 text-center"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    stat.color === 'orange' 
                      ? 'bg-orange-500/20 border border-orange-400/30' 
                      : 'bg-teal-500/20 border border-teal-400/30'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      stat.color === 'orange' ? 'text-orange-400' : 'text-teal-400'
                    }`} />
                  </div>

                  {/* Number */}
                  <div className={`text-4xl lg:text-5xl font-bold mb-3 ${
                    stat.color === 'orange' ? 'text-orange-400' : 'text-teal-400'
                  }`}>
                    {stat.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Gradient Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 rounded-2xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {bottomStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center text-white"
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-3 opacity-90" />
                      <div className="text-3xl lg:text-4xl font-bold mb-2">
                        {stat.number}
                      </div>
                      <div className="text-white/90 font-medium">
                        {stat.title}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats; 