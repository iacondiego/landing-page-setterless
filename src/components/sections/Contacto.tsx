"use client";

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Phone, Mail, Globe, Send, CheckCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface FormData {
  nombre: string;
  telefono: string;
  correo: string;
  sitioWeb: string;
}

interface FormErrors {
  nombre?: string;
  telefono?: string;
  correo?: string;
  sitioWeb?: string;
}

const Contacto = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    correo: '',
    sitioWeb: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validación en tiempo real
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return undefined;
      
      case 'telefono':
        if (!value.trim()) return 'El teléfono es requerido';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Formato de teléfono inválido';
        return undefined;
      
      case 'correo':
        if (!value.trim()) return 'El correo es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Formato de correo inválido';
        return undefined;
      
      case 'sitioWeb':
        if (!value.trim()) return 'El sitio web es requerido';
        try {
          new URL(value.startsWith('http') ? value : `https://${value}`);
          return undefined;
        } catch {
          return 'URL inválida (ej: empresa.com o https://empresa.com)';
        }
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real con debounce
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          sitioWeb: ''
        });
      }, 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-black via-surface-primary to-black py-24 overflow-hidden"
      id="contacto"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/5" />
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,102,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,102,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-sm font-medium text-primary-300">
                  Transformación Digital
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold"
              >
                <span className="text-white">Acelera tu </span>
                <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Crecimiento
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Déjanos conocer tu negocio y te mostraremos cómo nuestros agentes de IA pueden 
                <span className="text-primary-400 font-semibold"> multiplicar tus resultados por 3x</span> en los próximos 90 días.
              </motion.p>
            </div>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="space-y-4">
              {[
                "Consulta gratuita de 30 minutos",
                "Análisis personalizado de tu negocio",
                "Plan de automatización a medida",
                "ROI garantizado en 90 días"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-3 pt-8 border-t border-surface-tertiary">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                ¿Prefieres llamar?
              </p>
              <a
                href="tel:+1234567890"
                className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
              >
                +1 (555) 123-4567
              </a>
              <p className="text-sm text-gray-500">
                Disponible 24/7 • Respuesta garantizada en menos de 1 hora
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div variants={itemVariants} className="relative">
            {/* Form Container */}
            <div className="relative bg-surface-secondary/30 backdrop-blur-xl border border-surface-tertiary rounded-2xl p-8 shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl blur-xl" />
              
              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Comienza tu Transformación
                      </h3>
                      <p className="text-gray-400">
                        Comparte tus datos y te contactaremos en menos de 1 hora
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        name="nombre"
                        label="Nombre completo"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                        icon={<User className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="telefono"
                        label="Teléfono / WhatsApp"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        error={errors.telefono}
                        icon={<Phone className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="correo"
                        label="Correo electrónico"
                        type="email"
                        value={formData.correo}
                        onChange={handleInputChange}
                        error={errors.correo}
                        icon={<Mail className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="sitioWeb"
                        label="Sitio web de tu empresa"
                        value={formData.sitioWeb}
                        onChange={handleInputChange}
                        error={errors.sitioWeb}
                        icon={<Globe className="w-5 h-5" />}
                        placeholder="empresa.com"
                        required
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                        disabled={isSubmitting || Object.keys(errors).some(key => errors[key as keyof FormErrors])}
                      >
                        {isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Acelerar mi Negocio Ahora
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center leading-relaxed">
                        Al enviar este formulario, aceptas que nos pongamos en contacto contigo para 
                        ofrecerte nuestros servicios de automatización con IA. 
                        <span className="text-primary-400"> Sin spam, prometido.</span>
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Nos pondremos en contacto contigo en menos de 1 hora para comenzar 
                      tu transformación digital.
                    </p>
                    <p className="text-sm text-primary-400 font-semibold">
                      🚀 ¡Prepárate para acelerar tu negocio!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacto; 