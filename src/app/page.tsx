"use client";

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Proceso from '@/components/sections/Proceso';
import Contacto from '@/components/sections/Contacto';

export default function Home() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', as: 'image', href: '/images/hero-bg.webp' },
      { rel: 'preload', as: 'image', href: '/images/process-demo.webp' },
    ];

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link');
      Object.entries(link).forEach(([key, value]) => {
        linkElement.setAttribute(key, value);
      });
      document.head.appendChild(linkElement);
    });

    // Add custom CSS for grid animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes grid-move {
        0% { transform: translateX(0) translateY(0); }
        100% { transform: translateX(50px) translateY(50px); }
      }
      
      @keyframes animate-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      
      .animate-reverse {
        animation: animate-reverse 1s linear infinite;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #0A0A0A;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #0066FF, #1E40AF);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #0052CC, #1d4ed8);
      }
      
      /* Selection styling */
      ::selection {
        background-color: rgba(0, 102, 255, 0.3);
        color: white;
      }
      
      /* Focus styles for accessibility */
      .focus\\:ring-primary-500\\/20:focus {
        box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.2);
      }
      
      /* Smooth animations for reduced motion users */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    // Cleanup
    return () => {
      observer.disconnect();
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Process Section */}
      <Proceso />
      
      {/* Beneficios Section - Placeholder */}
      <section id="beneficios" className="py-24 bg-surface-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-8 font-display">
            Sección <span className="text-primary-500">Beneficios</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            🚧 En construcción - Aquí irán los increíbles beneficios de automatizar con IA
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              "Lead Gen Agents",
              "Customer Support 24/7", 
              "N8N Automations"
            ].map((service, index) => (
              <div key={index} className="p-8 bg-surface-primary/50 rounded-xl border border-primary-500/20">
                <h3 className="text-2xl font-semibold text-primary-400 mb-4">{service}</h3>
                <p className="text-gray-300">
                  Próximamente: Detalles épicos sobre cómo {service.toLowerCase()} 
                  transformará tu negocio completamente.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contacto Section */}
      <Contacto />

      {/* Footer - Simple */}
      <footer className="py-12 bg-surface-primary border-t border-primary-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary-500 mb-4 font-display">
              SETTERLESS
            </h3>
            <p className="text-gray-400 mb-6">
              Transformando negocios con automatización inteligente
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <span>© 2024 SETTERLESS. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Performance Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Performance monitoring
            if (typeof window !== 'undefined') {
              // Track Core Web Vitals
              function trackWebVitals() {
                if ('performance' in window && 'PerformanceObserver' in window) {
                  // First Contentful Paint
                  new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      if (entry.name === 'first-contentful-paint') {
                        console.log('FCP:', entry.startTime);
                      }
                    });
                  }).observe({ entryTypes: ['paint'] });

                  // Largest Contentful Paint
                  new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      console.log('LCP:', entry.startTime);
                    });
                  }).observe({ entryTypes: ['largest-contentful-paint'] });
                }
              }
              
              trackWebVitals();
            }
          `,
        }}
      />
    </>
  );
}
