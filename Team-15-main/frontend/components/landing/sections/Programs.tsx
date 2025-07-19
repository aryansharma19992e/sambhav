"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Monitor, 
  CreditCard, 
  HardHat, 
  Settings, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const Programs: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: "Beauty & Wellness",
      description: "Comprehensive training in beauty therapy, hair styling, and wellness services with industry-standard certification.",
      icon: Scissors,
      color: "pink",
      bgColor: "bg-pink-500",
      keyAreas: ["Hair Styling", "Nail Care", "Skin Care", "Spa Therapy"],
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "Information Technology",
      description: "Modern IT skill training including programming, digital literacy, and computer applications for the digital age.",
      icon: Monitor,
      color: "blue",
      bgColor: "bg-blue-500",
      keyAreas: ["Basic Computing", "Web Development", "Data Entry", "Digital Literacy"],
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: "Banking & Finance",
      description: "Financial literacy and banking sector skills to empower communities with economic knowledge and opportunities.",
      icon: CreditCard,
      color: "green",
      bgColor: "bg-green-500",
      keyAreas: ["Financial Literacy", "Banking Operations", "Customer Service", "Microfinance"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Construction",
      description: "Hands-on construction skills training with safety protocols and modern building techniques for sustainable careers.",
      icon: HardHat,
      color: "orange",
      bgColor: "bg-orange-500",
      keyAreas: ["Masonry", "Plumbing", "Electrical", "Safety Training"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      id: 5,
      title: "Manufacturing",
      description: "Industrial skills and manufacturing processes training to meet the growing demands of India's manufacturing sector.",
      icon: Settings,
      color: "slate",
      bgColor: "bg-slate-500",
      keyAreas: ["Machine Operation", "Quality Control", "Assembly Line", "Industrial Safety"],
      gradient: "from-slate-500 to-gray-500"
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
              Our <span className="text-orange-400">Training</span> Programs
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive skill development programs designed to meet industry demands 
              and create sustainable livelihood opportunities for our communities.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:transform hover:scale-105 h-full">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white mb-2">
                        {program.title}
                      </CardTitle>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {program.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Areas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.keyAreas.map((area, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-neutral-800 text-gray-300 text-xs rounded-full border border-neutral-700"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full mt-4 bg-transparent border-neutral-600 text-gray-300 hover:bg-neutral-800 hover:text-white group"
                        >
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of others who have transformed their lives through our training 
                programs. Take the first step towards a brighter future today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-full group"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-neutral-600 text-gray-300 hover:bg-neutral-800 hover:text-white px-8 py-3 rounded-full group"
                >
                  Download Brochure
                  <ExternalLink className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Programs; 