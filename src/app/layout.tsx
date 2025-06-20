// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Si Tu Supieras El Poder de la IA - ROI Demostrable. No Promesas.",
  description: "Deje de experimentar con la IA. Empiece a rentabilizarla. Diseñamos e implementamos soluciones de IA a medida que ofrecen un retorno de la inversión cuantificable.",
};

// Script de datos estructurados para SEO/AEO (Proyecto Fénix Sección 4.2)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Si Tu Supieras El Poder de la IA',
      url: 'https://sts.ai',
      logo: 'https://placehold.co/200x60/0f172a/94a3b8?text=STS+IA',
      sameAs: [
        'https://www.linkedin.com/company/sts-ai-consulting'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        // CORRECCIÓN: Se arregló el error de sintaxis en 'contactType'.
        'contactType': 'customer service'
      }
    },
    {
      '@type': 'WebSite',
      url: 'https://sts.ai',
      name: 'Si Tu Supieras El Poder de la IA',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://sts.ai/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'Service',
      'serviceType': 'Consultoría de Inteligencia Artificial',
      provider: {
        '@type': 'Organization',
        'name': 'Si Tu Supieras El Poder de la IA'
      },
      description: 'Diseñamos e implementamos soluciones de IA a medida que se integran perfectamente en sus operaciones, ofreciendo ganancias de eficiencia medibles y un retorno de la inversión cuantificable.'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
