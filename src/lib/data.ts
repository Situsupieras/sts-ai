// src/lib/data.ts
import { 
  Search, DraftingCompass, Rocket, TrendingUp, Box, CloudOff, 
  Puzzle, CheckCircle2, ChevronDown, PartyPopper, LucideIcon 
} from 'lucide-react';

export interface ProcessStep {
  id: number;
  title: string;
  icon: LucideIcon;
  details: string[];
}

export interface TrustContent {
  title: string;
  content: string;
  proof: {
    type: string;
    text: string;
  };
}

export interface FaqItem {
  id: number;
  q: string;
  a: string;
}

export const processData: ProcessStep[] = [
    { id: 1, title: 'Análisis Estratégico', icon: Search, details: ['Talleres con Interesados', 'Auditoría de Infraestructura de Datos', 'Benchmarking de ROI', 'Identificación de Oportunidades'] },
    { id: 2, title: 'Diseño de la Solución', icon: DraftingCompass, details: ['Arquitectura de IA Personalizada', 'Hoja de Ruta Tecnológica', 'Modelo de Gobierno de Datos', 'Plan de Integración'] },
    { id: 3, title: 'Implementación Ágil', icon: Rocket, details: ['Desarrollo por Sprints', 'Integración con Sistemas Heredados', 'Entrenamiento de Modelos', 'Pruebas de Calidad Rigurosas'] },
    { id: 4, title: 'Optimización Continua', icon: TrendingUp, details: ['Monitoreo de Rendimiento 24/7', 'Reentrenamiento de Modelos', 'Informes de Impacto de Negocio', 'Soporte Proactivo'] },
];

export const trustData: { [key: string]: TrustContent } = {
    cfo: {
        title: "Para el Director Financiero (CFO)",
        content: "Un testimonio en vídeo centrado en el ahorro de costes y un gráfico de ROI claro.",
        proof: { type: 'video', text: "“Logramos reducir los costos operativos en un 22% en solo seis meses con MRF Logistics. STS no solo prometió un ROI, lo entregó y superó nuestras expectativas.” - CFO, MRF Logistics" }
    },
    cto: {
        title: "Para el Director de Tecnología (CTO)",
        content: "Un estudio de caso que destaca la integración perfecta y una insignia de cumplimiento SOC 2.",
        proof: { type: 'case-study', text: "Estudio de Caso: Cómo integramos nuestra plataforma de IA con SAP en Aperture Dynamics en menos de 8 semanas, garantizando la integridad de los datos con cumplimiento SOC 2." }
    },
    ceo: {
        title: "Para el Director Ejecutivo (CEO)",
        content: "Logos de clientes de Fortune 500 y una cita sobre la asociación estratégica.",
        proof: { type: 'quote', text: "“Más que un proveedor, STS es un socio estratégico que ha sido fundamental para nuestra transformación digital y ventaja competitiva.” - CEO, Veridian Nexus" }
    }
};

export const faqData: FaqItem[] = [
    { id: 1, q: "¿Cuánto tiempo lleva la implementación?", a: "Nuestros proyectos de implementación ágil suelen durar entre 8 y 16 semanas, desde el análisis estratégico hasta la puesta en marcha. El cronograma exacto depende de la complejidad y el alcance de la solución." },
    { id: 2, q: "¿Cómo garantizan la seguridad y privacidad de los datos?", a: "La seguridad es nuestra máxima prioridad. Operamos bajo estrictos protocolos de gobernanza de datos, cumpliendo con normativas como GDPR y CCPA, y poseemos certificaciones como ISO 27001 para garantizar que sus datos estén siempre protegidos." },
    { id: 3, q: "¿Qué tipo de soporte ofrecen después del lanzamiento?", a: "Ofrecemos un modelo de optimización continua con soporte proactivo 24/7. No solo solucionamos problemas; monitoreamos el rendimiento y reentrenamos los modelos para garantizar que el valor de negocio crezca con el tiempo." },
    { id: 4, q: "¿Trabajan con nuestra pila tecnológica existente?", a: "Sí. Nuestras soluciones están diseñadas para ser agnósticas a la tecnología. Nos integramos de forma nativa con las principales plataformas (AWS, Azure, Google Cloud) y sistemas heredados (SAP, Oracle, Salesforce) para una implementación fluida." }
];

