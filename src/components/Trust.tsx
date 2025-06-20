// src/components/Trust.tsx
"use client";
import React, { useState } from 'react';
import { trustData } from '@/lib/data';

export const Trust = () => {
    const [activeTab, setActiveTab] = useState('cfo');
    
    return (
        <section className="py-20 px-4 bg-slate-900">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resultados Probados para Cada <span className="gradient-text">Decisión Clave</span></h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">Entendemos que la compra B2B es una decisión de equipo. Por eso, presentamos la evidencia que cada líder necesita para confiar en la inversión.</p>
                </div>
                <div className="flex justify-center mb-8 border-b border-slate-700">
                    <button 
                        onClick={() => setActiveTab('cfo')} 
                        className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'cfo' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Para el CFO
                    </button>
                    <button 
                        onClick={() => setActiveTab('cto')} 
                        className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'cto' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Para el CTO
                    </button>
                    <button 
                        onClick={() => setActiveTab('ceo')} 
                        className={`py-3 px-6 font-semibold transition-colors ${activeTab === 'ceo' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Para el CEO
                    </button>
                </div>
                <div className="glass-card p-8 rounded-xl min-h-[200px] transition-all duration-300">
                    <h3 className="font-bold text-xl text-white mb-2">{trustData[activeTab].title}</h3>
                    <p className="text-slate-300 mb-4">{trustData[activeTab].content}</p>
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-sky-500">
                        <p className="text-slate-200 italic">&quot;{trustData[activeTab].proof.text}&quot;</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
