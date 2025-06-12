"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const stats = [
    { value: '300%', label: 'Más Leads', icon: TrendingUp },
    { value: '24/7', label: 'Disponibilidad', icon: Zap },
    { value: '80%', label: 'Menos Trabajo Manual', icon: Sparkles },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface-primary via-surface-primary to-surface-primary pt-24">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
                 {/* Gradient Mesh */}
         <div className="absolute inset-0 bg-gradient-to-b from-surface-primary via-surface-primary/90 to-surface-secondary/60" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Dynamic Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent"
          animate={{
            x: (mousePosition.x - 50) * 2,
            y: (mousePosition.y - 50) * 2,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: textY }}
      >
        <div className="max-w-6xl mx-auto">
          


          {/* Main Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-white font-display leading-normal mt-8"
            style={{ lineHeight: '1.3' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block">Transformamos tu</span>
            <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-text-glow">
              negocio con IA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transformamos tu empresa con{' '}
            <motion.span 
              className="text-primary-400 font-semibold"
              whileHover={{ textShadow: "0 0 20px rgba(0, 102, 255, 0.8)" }}
            >
              Lead Gen Agents
            </motion.span>
            ,{' '}
            <motion.span 
              className="text-primary-400 font-semibold"
              whileHover={{ textShadow: "0 0 20px rgba(0, 102, 255, 0.8)" }}
            >
              Customer Support 24/7
            </motion.span>
            {' '}y{' '}
            <motion.span 
              className="text-primary-400 font-semibold"
              whileHover={{ textShadow: "0 0 20px rgba(0, 102, 255, 0.8)" }}
            >
              Automatizaciones N8N
            </motion.span>
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Elimina el 80% de las tareas repetitivas, genera 3x más leads calificados 
            y ofrece soporte instantáneo a tus clientes. Todo mientras duermes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button
              variant="primary"
              size="xl"
              onClick={() => smoothScrollTo('contacto')}
              className="group shadow-glow-xl"
            >
              Consulta Gratuita Ahora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={() => smoothScrollTo('proceso')}
            >
              Ver Nuestro Proceso
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 pb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="text-center p-8 rounded-2xl bg-surface-secondary/50 backdrop-blur-sm border border-primary-500/20 hover:border-primary-500/40 transition-all duration-500 shadow-elevation-2 group-hover:shadow-glow min-h-[200px] flex flex-col justify-center">
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-12 h-12 mx-auto mb-4 text-primary-400"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-full h-full" />
                  </motion.div>
                  
                  {/* Value */}
                  <motion.div 
                    className="text-4xl font-bold text-primary-500 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-gray-300 font-medium">
                    {stat.label}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-primary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary-500/30 rounded-full flex justify-center cursor-pointer hover:border-primary-500/60 transition-colors duration-300"
          onClick={() => smoothScrollTo('proceso')}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-surface-primary/40 to-surface-secondary pointer-events-none" />
    </section>
  );
};

export default Hero; 