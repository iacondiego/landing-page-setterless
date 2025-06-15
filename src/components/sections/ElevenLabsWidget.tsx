"use client";

import { useEffect } from 'react';

export default function ElevenLabsWidget() {
  useEffect(() => {
    // Cargar el script del widget si no existe
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }

    // Aplicar estilos después de que el widget se cargue
    const applyWidgetStyles = () => {
      const widget = document.querySelector('elevenlabs-convai') as HTMLElement;
      if (widget) {
        widget.style.position = 'relative';
        widget.style.bottom = 'auto';
        widget.style.right = 'auto';
        widget.style.left = 'auto';
      }
    };

    // Intentar aplicar estilos después de un delay
    const timer = setTimeout(applyWidgetStyles, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-black relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12 font-display">
          Habla con el agente de <span className="text-primary-500">setterless</span>
        </h2>
        
        <div className="elevenlabs-widget-section">
          <elevenlabs-convai agent-id="agent_01jxtbwt58fcwa0w8bs1s8agcm"></elevenlabs-convai>
        </div>
      </div>

      {/* Estilos personalizados para el widget */}
      <style jsx>{`
        .elevenlabs-widget-section {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100px;
          padding: 5px 0;
        }

        :global(elevenlabs-convai) {
          position: relative !important;
          bottom: auto !important;
          right: auto !important;
          left: auto !important;
          margin: 0 auto !important;
          background-color: black !important;
          border-radius: 8px !important;
        }

        :global(elevenlabs-convai *) {
          background-color: black !important;
        }
      `}</style>
    </section>
  );
} 