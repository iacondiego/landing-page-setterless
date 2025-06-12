"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-surface-primary/80 backdrop-blur-xl border-b border-primary-500/20 shadow-glow" 
          : "bg-transparent"
      )}
      style={{ 
        opacity: headerOpacity,
        backdropFilter: scrolled ? `blur(${headerBlur}px)` : 'none'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => smoothScrollTo('hero')}
          >
            {/* Robot Icon */}
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 p-2">
                {/* Robot SVG */}
                <svg 
                  className="w-8 h-8 text-white" 
                  viewBox="0 0 200 200" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Robot Head */}
                  <path d="M50 50 L150 50 Q160 50 160 60 L160 100 Q160 110 150 110 L50 110 Q40 110 40 100 L40 60 Q40 50 50 50 Z" 
                        stroke="currentColor" strokeWidth="3" fill="none"/>
                  
                  {/* Eyes */}
                  <circle cx="70" cy="75" r="8" fill="currentColor"/>
                  <circle cx="130" cy="75" r="8" fill="currentColor"/>
                  
                  {/* Mouth */}
                  <rect x="85" y="90" width="30" height="4" rx="2" fill="currentColor"/>
                  
                  {/* Body */}
                  <rect x="60" y="110" width="80" height="60" rx="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                  
                  {/* Arms */}
                  <rect x="35" y="125" width="25" height="8" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="140" y="125" width="25" height="8" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  
                  {/* Legs */}
                  <rect x="75" y="170" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="113" y="170" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  
                  {/* Antenna */}
                  <line x1="100" y1="50" x2="100" y2="35" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="100" cy="30" r="4" fill="currentColor"/>
                </svg>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.div>
            
            <div>
              <motion.h1 
                className="text-2xl font-bold text-white font-display"
                whileHover={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
              >
                SETTERLESS
              </motion.h1>
              <motion.p 
                className="text-xs text-primary-400/80 -mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                AI Automation Agency
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                className="relative text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium group px-3 py-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
                
                {/* Hover effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.button>
            ))}
          </nav>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="md"
                onClick={() => smoothScrollTo('contacto')}
                className="hidden sm:flex"
              >
                Consulta Gratis
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-surface-primary/95 backdrop-blur-xl border-b border-primary-500/20",
          isMenuOpen ? "block" : "hidden"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                className="text-left text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium py-3 px-4 rounded-lg hover:bg-primary-500/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => smoothScrollTo('contacto')}
                className="w-full"
              >
                Consulta Gratis
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              top: '50%',
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.header>
  );
};

export default Header; 