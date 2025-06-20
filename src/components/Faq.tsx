// src/components/Faq.tsx
"use client";
import React, { useState } from 'react';
import { faqData } from '@/lib/data';
import { ChevronDown } from 'lucide-react';

export const Faq = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const toggleFaq = (id: number) => setActiveFaq(activeFaq === id ? null : id);

    return (
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resolvemos sus <span className="gradient-text">Dudas</span></h2>
                    <p className="text-slate-400 text-lg">Preguntas frecuentes de líderes como usted.</p>
                </div>
                <div className="space-y-4">
                    {faqData.map(item => (
                        <div key={item.id} className="glass-card rounded-lg overflow-hidden">
                            <button onClick={() => toggleFaq(item.id)} className="w-full flex justify-between items-center text-left p-5 font-semibold text-white">
                                <span>{item.q}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === item.id ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`transition-all duration-500 ease-in-out ${activeFaq === item.id ? 'max-h-96' : 'max-h-0'}`}>
                                <div className="p-5 pt-0 text-slate-300">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
