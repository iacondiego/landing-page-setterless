"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles
} from 'lucide-react';

const Servicios = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      image: "/servicios/Consultoria estrategica.jpg",
      title: "Consultoría Estratégica en Automatización con IA",
      description: "Te ayudamos a diseñar e implementar sistemas inteligentes que optimizan procesos, reducen costos y escalan resultados en tu negocio.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      image: "/servicios/Agentes IA para atencion al cliente.png",
      title: "Agentes IA para Atención al Cliente y Ventas",
      description: "Asistentes virtuales multicanal que atienden en WhatsApp, Instagram, web y más. Responden al instante, resuelven dudas y convierten conversaciones en ventas.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      image: "/servicios/Agente de voz.png",
      title: "Agentes de Voz Inteligentes",
      description: "Sistemas de voz que atienden llamadas, responden preguntas y ejecutan tareas como un operador humano, las 24 horas del día.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      image: "/servicios/Automatizacion de procesos empresariales.jpg",
      title: "Automatización de Procesos Empresariales",
      description: "Elimina tareas repetitivas y mejora la eficiencia con flujos automatizados que liberan tiempo y reducen errores operativos.",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      image: "/servicios/Automatizacion de contenido.jpg",
      title: "Automatización de Contenido",
      description: "Genera contenido automático para redes, guiones y marketing, manteniendo una comunicación constante y alineada con tu marca.",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      image: "/servicios/Agentes RAG.png",
      title: "Agentes RAG y Bases de Conocimiento",
      description: "Transforma tus documentos en una base inteligente que responde al instante y centraliza el conocimiento de tu empresa.",
      gradient: "from-cyan-500/20 to-teal-500/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section 
      ref={ref} 
      id="servicios" 
      className="py-24 bg-gradient-to-b from-surface-secondary via-surface-primary to-surface-secondary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
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
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Nuestros Servicios
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-display"
            variants={itemVariants}
          >
            <span className="block">Soluciones de</span>
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Automatización IA
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Implementamos tecnología de vanguardia para transformar tu negocio 
            y llevarlo al siguiente nivel con inteligencia artificial.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-full bg-surface-secondary/50 rounded-2xl border border-primary-500/20 overflow-hidden backdrop-blur-sm group-hover:border-primary-500/40 transition-all duration-300 shadow-elevation-2 group-hover:shadow-glow">
                
                {/* Image Section */}
                <div className={`relative h-48 bg-gradient-to-br ${service.gradient} overflow-hidden`}>
                  {/* Service Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-secondary via-surface-secondary/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Servicios;

