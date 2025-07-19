"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react';

const ContactFooter: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Contact Section */}
      <section className="py-20">
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
                Get In <span className="text-orange-400">Touch</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Ready to make a difference? Contact us to learn more about our programs, 
                volunteer opportunities, or partnership possibilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input 
                        placeholder="Your first name"
                        className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Your last name"
                        className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-orange-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <Input 
                      type="tel"
                      placeholder="+91 99755 43210"
                      className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-orange-400 resize-none"
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-lg group"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/30">
                        <MapPin className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Address</h4>
                        <p className="text-gray-300 leading-relaxed">
                          123 Community Center Road<br />
                          New Delhi, Delhi 110001<br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center border border-teal-400/30">
                        <Phone className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Phone</h4>
                        <p className="text-gray-300">
                          +91 1 2345 6789<br />
                          +91 99755 43210
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/30">
                        <Mail className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email</h4>
                        <p className="text-gray-300">
                          info@sambhavfoundation.org<br />
                          support@sambhavfoundation.org
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Saturday</span>
                      <span className="text-white">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Sunday</span>
                      <span className="text-red-400">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="border-t border-neutral-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Logo & Copyright */}
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-orange-400" />
                <span className="font-bold text-white">Sambhav Foundation</span>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  © 2025 Sambhav Foundation. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Empowering communities, transforming lives, building a better tomorrow.
                </p>
              </div>

              {/* Footer Links */}
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter; 