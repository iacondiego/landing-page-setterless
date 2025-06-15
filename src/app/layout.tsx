import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ElevenLabsWidget from "@/components/ui/ElevenLabsWidget";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SETTERLESS - Automatización de Negocios con IA | Lead Gen & Customer Support",
  description: "Transformamos tu empresa con Lead Gen Agents, Customer Support 24/7 y Automatizaciones N8N. Elimina el 80% de tareas repetitivas y genera 3x más leads calificados.",
  keywords: [
    "automatización con IA",
    "lead generation agents",
    "customer support automation", 
    "N8N automations",
    "chatbots inteligentes",
    "automatización de procesos",
    "IA para empresas",
    "agentes de ventas AI",
    "soporte al cliente 24/7",
    "SETTERLESS"
  ],
  authors: [{ name: "SETTERLESS Team" }],
  creator: "SETTERLESS",
  publisher: "SETTERLESS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://setterless.com",
    title: "SETTERLESS - La Revolución de la Automatización con IA",
    description: "Automatiza tu negocio con IA. Lead Gen Agents, Customer Support 24/7 y N8N Automations. Genera 3x más leads y reduce 80% el trabajo manual.",
    siteName: "SETTERLESS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SETTERLESS - Automatización de Negocios con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SETTERLESS - Automatización de Negocios con IA",
    description: "Transforma tu empresa con IA: Lead Gen Agents, Customer Support 24/7 y N8N Automations. ¡Consulta gratuita!",
    images: ["/twitter-image.jpg"],
    creator: "@setterless",
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
  alternates: {
    canonical: "https://setterless.com",
  },
  category: "technology",
  classification: "Business Automation",
  other: {
    'theme-color': '#0066FF',
    'color-scheme': 'dark',
    'msapplication-TileColor': '#0066FF',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Theme and branding */}
        <meta name="theme-color" content="#0066FF" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#0066FF" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-TileColor" content="#0066FF" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} bg-surface-primary text-white antialiased`}>
        {/* Loading animation */}
        <div id="loading-screen" className="fixed inset-0 z-50 bg-surface-primary flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>

        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-lg z-50 transition-all duration-300"
        >
          Saltar al contenido principal
        </a>

        {/* Main content */}
        <main id="main-content" className="relative">
          {children}
        </main>

        {/* ElevenLabs Widget - Always visible */}
        <ElevenLabsWidget />

        {/* Global scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove loading screen when page is loaded
              window.addEventListener('load', function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                  loadingScreen.style.opacity = '0';
                  setTimeout(() => {
                    loadingScreen.remove();
                  }, 300);
                }
              });

              // Smooth scroll polyfill for older browsers
              if (!('scrollBehavior' in document.documentElement.style)) {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
                document.head.appendChild(script);
                script.onload = function() {
                  window.__forceSmoothScrollPolyfill__ = true;
                  window.smoothscroll.polyfill();
                };
              }

              // Preload critical resources
              const criticalResources = [
                '/images/hero-bg.webp',
                '/images/process-demo.webp'
              ];
              
              criticalResources.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
              });
            `,
          }}
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SETTERLESS",
              "description": "Agencia de automatización de negocios con IA especializada en Lead Gen Agents, Customer Support y N8N Automations",
              "url": "https://setterless.com",
              "logo": "https://setterless.com/logo.png",
              "sameAs": [
                "https://twitter.com/setterless",
                "https://linkedin.com/company/setterless"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ES"
              },
              "offers": {
                "@type": "Offer",
                "name": "Consulta Gratuita de Automatización con IA",
                "description": "Análisis gratuito de tu negocio para identificar oportunidades de automatización",
                "price": "0",
                "priceCurrency": "EUR"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
