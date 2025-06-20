// src/components/Process.tsx
"use client";
import React, { useState } from 'react';
import { processData } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

export const Process = () => {
    const [activeProcess, setActiveProcess] = useState<number | null>(null);
    const toggleProcess = (id: number) => setActiveProcess(activeProcess === id ? null : id);

    return (
        <section id="proceso" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Proceso: De la Estrategia al <span className="gradient-text">Valor Tangible</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Hemos desmitificado la implementación de la IA. Explore nuestro enfoque probado para entender cómo eliminamos el riesgo y garantizamos resultados.</p>
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2"></div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {processData.map((step, index) => (
                            <div key={step.id} className="text-center cursor-pointer interactive-step" onClick={() => toggleProcess(step.id)}>
                                <div className="relative flex justify-center items-center">
                                    <div className="step-icon w-20 h-20 rounded-full bg-slate-800 border-2 border-sky-500 flex items-center justify-center transition-all duration-300">
                                        <step.icon className="w-10 h-10 text-sky-400" />
                                    </div>
                                </div>
                                <h3 className="mt-4 font-bold text-white text-lg">{index + 1}. {step.title}</h3>
                                <p className="text-sm text-slate-400 mt-1">Clic para ver detalles</p>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeProcess === step.id ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                                    <div className="glass-card text-left p-4 rounded-lg">
                                        <ul className="space-y-2">
                                            {step.details.map(detail => (
                                                <li key={detail} className="flex items-start">
                                                    <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                                    <span className="text-slate-300 text-sm">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
