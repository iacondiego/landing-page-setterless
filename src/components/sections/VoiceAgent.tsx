"use client";

import React from 'react';

// Declaración de TypeScript para el elemento personalizado
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id'?: string;
        'variant'?: string;
        'action-text'?: string;
        'start-call-text'?: string;
        'end-call-text'?: string;
        'listening-text'?: string;
        'speaking-text'?: string;
        'override-language'?: string;
        'override-first-message'?: string;
      };
    }
  }
}

export default function VoiceAgent() {
  return (
    <section 
      id="agente-voz" 
      className="py-20 relative"
      style={{
        background: `linear-gradient(to bottom, 
          rgba(20,20,20,1) 0%, 
          rgba(18,18,18,0.98) 20%, 
          rgba(16,16,16,0.95) 40%, 
          rgba(14,14,14,0.9) 60%, 
          rgba(12,12,12,0.95) 80%, 
          rgba(10,10,10,1) 100%)`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            🎤 Habla Con El <span className="text-primary-500">Agente de Voz</span> de SETTERLESS
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experimenta el futuro de la comunicación empresarial. Habla directamente con nuestro agente de IA.
          </p>

          <div 
            style={{ minHeight: '150px', padding: '40px 0' }}
            dangerouslySetInnerHTML={{
              __html: `
                <div class="elevenlabs-widget-section">
                  <elevenlabs-convai agent-id="agent_01jxtbwt58fcwa0w8bs1s8agcm"></elevenlabs-convai>
                </div>

                <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>

                <style>
                  /* Contenedor del widget dentro de su sección */
                  .elevenlabs-widget-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    min-height: 100px; /* Ajusta esta altura según necesites */
                    padding: 5px 0;
                  }

                  elevenlabs-convai {
                    position: relative !important;
                    bottom: auto !important;
                    right: auto !important;
                    left: auto !important;
                    margin: 0 auto !important;
                  }
                </style>

                <script>
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      const widget = document.querySelector('elevenlabs-convai');
                      if (widget) {
                        widget.style.position = 'relative';
                        widget.style.bottom = 'auto';
                        widget.style.right = 'auto';
                        widget.style.left = 'auto';
                      }
                    }, 1000);
                  });
                </script>
              `
            }}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ✨ Powered by <span className="text-primary-400">Eleven Labs</span> • 
              Tecnología de voz avanzada con IA
            </p>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" 
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(26,26,26,0.5) 50%, 
            rgba(26,26,26,1) 100%)`
        }} 
      />
    </section>
  );
} 