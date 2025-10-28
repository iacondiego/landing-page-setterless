"use client";

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Phone, Mail, Building2, Send, CheckCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface FormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  descripcion: string;
}

interface FormErrors {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  descripcion?: string;
}

const Contacto = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cargar script de Zentrol cuando se envía el formulario
  React.useEffect(() => {
    if (isSubmitted) {
      const script = document.createElement('script');
      script.src = 'https://api.zentrol.es/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup: remover script cuando el componente se desmonte
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isSubmitted]);

  // Validación en tiempo real
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return undefined;
      
      case 'empresa':
        if (!value.trim()) return 'El nombre de la empresa es requerido';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'El email es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Formato de email inválido';
        return undefined;
      
      case 'telefono':
        if (!value.trim()) return undefined; // Teléfono es opcional
        const phoneRegex = /^[\+]?[0-9\s\-()]{7,20}$/;
        if (!phoneRegex.test(value)) return 'Formato de teléfono inválido';
        return undefined;
      
      case 'servicio':
        if (!value.trim()) return 'Debes seleccionar un servicio';
        return undefined;
      
      case 'descripcion':
        if (!value.trim()) return 'La descripción es requerida';
        if (value.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    try {
      // Enviar datos a través de nuestra API interna
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          empresa: formData.empresa,
          email: formData.email,
          telefono: formData.telefono,
          servicio: formData.servicio,
          descripcion: formData.descripcion
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Formulario enviado exitosamente:', result);
        setIsSubmitted(true);
        
        // Reset form después de completar la cita (más tiempo)
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            servicio: '',
            descripcion: ''
          });
        }, 300000); // 5 minutos para que tenga tiempo de agendar
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error completo al enviar el formulario:', error);
      
      // Mensaje de error más específico
      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}`
        : 'Error desconocido al enviar el formulario';
      
      alert(`Hubo un problema: ${errorMessage}\n\nPor favor, abre la consola del navegador (F12) para ver más detalles.`);
    } finally {
      setIsSubmitting(false);
    }
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
      className="relative min-h-screen bg-gradient-to-b from-surface-primary via-surface-primary to-black py-24 overflow-hidden"
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <Input
                        name="nombre"
                        label="Nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                        icon={<User className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="empresa"
                        label="Empresa"
                        placeholder="Nombre de empresa o proyecto"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        error={errors.empresa}
                        icon={<Building2 className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Tu correo electrónico de contacto"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        icon={<Mail className="w-5 h-5" />}
                        required
                      />

                      <Input
                        name="telefono"
                        label="Teléfono"
                        type="tel"
                        placeholder="Déjanos tu teléfono para una respuesta más rápida"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        error={errors.telefono}
                        icon={<Phone className="w-5 h-5" />}
                      />

                      {/* Select de Servicio */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Servicio (selecciona el que mejor se adapte a tu caso) <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="servicio"
                          value={formData.servicio}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface-primary border ${
                            errors.servicio ? 'border-red-500' : 'border-surface-tertiary'
                          } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300`}
                          required
                        >
                          <option value="">Elige el servicio que mejor se adapte a tus necesidades</option>
                          <option value="consultoria">Consultoría Estratégica en Automatización con IA</option>
                          <option value="agentes-atencion">Agentes IA para Atención al Cliente y Ventas</option>
                          <option value="agentes-voz">Agentes de Voz Inteligentes</option>
                          <option value="procesos">Automatización de Procesos Empresariales</option>
                          <option value="contenido">Automatización de Contenido</option>
                          <option value="rag">Agentes RAG y Bases de Conocimiento</option>
                        </select>
                        {errors.servicio && (
                          <p className="text-sm text-red-400 mt-1">{errors.servicio}</p>
                        )}
                      </div>

                      {/* Textarea de Descripción */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Descripción de lo que necesitas <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          placeholder="Describe con detalle lo que necesitas. Cuanto más específiques, mejor te podremos ayudar."
                          rows={5}
                          className={`w-full px-4 py-3 bg-surface-primary border ${
                            errors.descripcion ? 'border-red-500' : 'border-surface-tertiary'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 resize-none`}
                          required
                        />
                        {errors.descripcion && (
                          <p className="text-sm text-red-400 mt-1">{errors.descripcion}</p>
                        )}
                      </div>

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
                            ENVIAR SOLICITUD
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
                    className="py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-center mb-6"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        ¡Datos Enviados Exitosamente!
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Ahora agenda tu consulta gratuita de 30 minutos
                      </p>
                    </motion.div>

                    {/* Widget de Zentrol */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="w-full"
                    >
                      <iframe 
                        src="https://api.zentrol.es/widget/booking/M6ONmdUpecs7PNCx7jYe" 
                        style={{
                          width: '100%',
                          border: 'none',
                          overflow: 'hidden',
                          minHeight: '600px',
                          borderRadius: '12px'
                        }}
                        scrolling="no" 
                        id="M6ONmdUpecs7PNCx7jYe_1749818464874"
                        title="Agendar Cita"
                      />
                    </motion.div>
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