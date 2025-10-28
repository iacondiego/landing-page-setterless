"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const Proceso = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const processSteps = [
    {
      number: "01",
      title: "Análisis Profundo",
      description: "Estudiamos tu negocio para identificar procesos automatizables y oportunidades de mejora.",
      phase: "Fase 1"
    },
    {
      number: "02", 
      title: "Estrategia Personalizada",
      description: "Diseñamos una solución IA específica para tus necesidades y objetivos únicos.",
      phase: "Fase 2"
    },
    {
      number: "03",
      title: "Implementación Técnica", 
      description: "Desarrollamos y configuramos tus agentes IA y automatizaciones con tecnología de vanguardia.",
      phase: "Fase 3"
    },
    {
      number: "04",
      title: "Optimización Continua",
      description: "Monitoreamos, ajustamos y mejoramos constantemente el rendimiento de tus sistemas.",
      phase: "Fase 4"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section ref={ref} id="proceso" className="py-24 bg-gradient-to-b from-surface-secondary via-surface-primary/80 to-surface-secondary relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
            variants={itemVariants}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Nuestro Proceso Probado
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-display"
            variants={itemVariants}
          >
            <span className="block">Cómo</span>
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Transformamos
            </span>
            <span className="block">tu Negocio</span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Un proceso sistemático y probado para automatizar tus operaciones 
            y multiplicar tus resultados.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-6">
                  
                  {/* Step Number */}
                  <div className="flex-shrink-0 relative">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-glow group-hover:shadow-glow-lg transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.number}
                    </motion.div>
                    
                    {/* Connector Line */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary-500/50 to-transparent" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-surface-secondary/50 rounded-xl p-6 border border-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300 backdrop-blur-sm">
                      
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <span className="text-primary-400 text-sm font-medium bg-primary-500/10 px-3 py-1 rounded-full">
                          {step.phase}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-primary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA at bottom */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => smoothScrollTo('contacto')}
              className="group"
            >
              Comenzar Mi Transformación
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Proceso; 