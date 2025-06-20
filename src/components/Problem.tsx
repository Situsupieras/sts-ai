// src/components/Problem.tsx
"use client";
import React from 'react';
import { Box, CloudOff, Puzzle } from 'lucide-react';

export const Problem = () => (
  <section className="py-20 px-4 bg-slate-900">
    <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Los Costes Ocultos de una Estrategia de IA <span className="text-red-400">Defectuosa</span></h2>
        <p className="text-slate-400 text-lg mb-12">Si su iniciativa de IA se siente como un centro de costes en lugar de un motor de beneficios, no está solo.</p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="glass-card p-6 rounded-xl">
                <Box className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="font-bold text-white text-xl mb-2">Proyectos Piloto que Nunca Escalan</h3>
                <p className="text-slate-400">Inversiones iniciales que muestran promesas pero nunca logran un impacto a nivel empresarial.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <CloudOff className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="font-bold text-white text-xl mb-2">Costes de Nube Crecientes sin ROI</h3>
                <p className="text-slate-400">Facturas de cloud que se disparan sin una correlación clara con el aumento de ingresos o la reducción de costes.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <Puzzle className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="font-bold text-white text-xl mb-2">Integración Fragmentada</h3>
                <p className="text-slate-400">Soluciones &quot;de vanguardia&quot; que no se comunican con sus sistemas heredados, creando silos de datos.</p>
            </div>
        </div>
    </div>
  </section>
);
