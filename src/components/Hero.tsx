// src/components/Hero.tsx
"use client";
import React from 'react';

export const Hero = () => (
  <header className="hero-bg min-h-screen flex items-center justify-center p-4">
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
    <div className="text-center z-10 max-w-4xl mx-auto">
        <div className="inline-block bg-slate-800 text-sky-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Si Tu Supieras El Poder de la IA
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Deje de Experimentar con la IA. <span className="gradient-text">Empiece a Rentabilizarla.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
            Diseñamos e implementamos soluciones de IA a medida que se integran perfectamente en sus operaciones, ofreciendo ganancias de eficiencia medibles y un retorno de la inversión cuantificable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formulario" className="cta-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Programe su Evaluación de ROI
            </a>
            <a href="#proceso" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                Vea Nuestro Proceso
            </a>
        </div>
        <div className="mt-12">
            <p className="text-slate-400 mb-4">Confiado por líderes de la industria:</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 opacity-70">
                <span className="font-bold text-xl">Aperture Dynamics</span>
                <span className="font-bold text-xl">Veridian Nexus</span>
                <span className="font-bold text-xl">Quantum Metric</span>
                <span className="font-bold text-xl">Stellar Solutions</span>
            </div>
        </div>
    </div>
  </header>
);
