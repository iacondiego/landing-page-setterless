"use client";

import { useEffect } from 'react';

export default function ElevenLabsWidget() {
  useEffect(() => {
    // Cargar el script del widget si no existe
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Widget fijo en la esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50">
        <elevenlabs-convai agent-id="agent_01jxtbwt58fcwa0w8bs1s8agcm"></elevenlabs-convai>
      </div>
    </>
  );
} 