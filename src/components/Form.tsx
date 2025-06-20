// src/components/Form.tsx

"use client";

import React, { useState } from 'react';
import { PartyPopper, LoaderCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// Define un tipo para gestionar el estado del envío del formulario
type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string | null;
}

// CORRECCIÓN: Se ha verificado toda la sintaxis para resolver el error "Unexpected token".
// El código ahora es robusto y está listo para compilar.
export const Form = () => {
    // Estado para controlar el paso actual del formulario
    const [currentFormStep, setCurrentFormStep] = useState(1);
    
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '', 
        empresa: '', 
        desafio: ''
    });
    
    // Estado para gestionar la respuesta visual del formulario (cargando, éxito, error)
    const [formState, setFormState] = useState<FormState>({ status: 'idle', message: null });
    
    // Actualiza el estado de los datos del formulario cuando el usuario escribe
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    // Funciones para navegar entre los pasos del formulario
    const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setCurrentFormStep(s => s + 1); };
    const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setCurrentFormStep(s => s - 1); };

    // Función que se ejecuta al enviar el formulario final
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState({ status: 'loading', message: null });

      try {
        const response = await fetch('/sts.ai/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message || 'La respuesta del servidor no fue OK');
        }

        const result = await response.json();
        setFormState({ status: 'success', message: result.message || '¡Gracias! Nos pondremos en contacto pronto.' });

      } catch (error) {
        setFormState({ status: 'error', message: 'Hubo un problema al enviar el formulario. Inténtelo de nuevo más tarde.' });
      }
    };

    return (
        <section id="formulario" className="py-20 px-4 bg-slate-900">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para Ver su <span className="gradient-text">ROI de IA</span>?</h2>
                <p className="text-slate-400 text-lg mb-8">Una consulta de 30 minutos es el primer paso para transformar su operación. Sin compromiso. Solo valor.</p>
                <div className="glass-card p-8 rounded-xl text-left">
                    
                    {formState.status === 'success' ? (
                      <div className="text-center p-4">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white">¡Formulario Enviado!</h3>
                        <p className="text-slate-300 mt-2">{formState.message}</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-8">
                            <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentFormStep -1) / 2 * 100}%` }}></div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className={currentFormStep === 1 ? 'block' : 'hidden'}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-slate-300 font-medium mb-2">Nombre Completo</label>
                                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleFormChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" required placeholder="Ej: Maria Rodriguez" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-slate-300 font-medium mb-2">Correo Electrónico de Trabajo</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" required placeholder="maria.r@suempresa.com" />
                            </div>
                            <button onClick={nextStep} className="w-full cta-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">Continuar</button>
                          </div>
                          <div className={currentFormStep === 2 ? 'block' : 'hidden'}>
                             <div className="mb-4">
                                <label htmlFor="empresa" className="block text-slate-300 font-medium mb-2">Nombre de la Empresa</label>
                                <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleFormChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" placeholder="Ej: Aperture Dynamics" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="desafio" className="block text-slate-300 font-medium mb-2">¿Cuál es su mayor desafío actual?</label>
                                <select id="desafio" name="desafio" value={formData.desafio} onChange={handleFormChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" required>
                                    <option value="">Seleccione una opción...</option>
                                    <option value="eficiencia">Aumentar eficiencia operativa</option>
                                    <option value="costos">Reducir costos</option>
                                    <option value="decision">Mejorar toma de decisiones</option>
                                    <option value="automatizacion">Automatizar procesos</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={prevStep} className="w-1/2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition">Atrás</button>
                                <button onClick={nextStep} className="w-1/2 cta-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">Continuar</button>
                            </div>
                          </div>
                          <div className={currentFormStep === 3 ? 'block' : 'hidden'}>
                              <div className="text-center mb-6">
                                  <PartyPopper className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                                  <h3 className="text-xl font-bold text-white">¡Casi listo!</h3>
                                  <p className="text-slate-400">Solo un último paso para agendar su evaluación.</p>
                              </div>
                              <div className="flex gap-4">
                                  <button onClick={prevStep} className="w-1/2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition">Atrás</button>
                                  <button type="submit" disabled={formState.status === 'loading'} className="w-1/2 cta-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center disabled:opacity-50">
                                      {formState.status === 'loading' ? <LoaderCircle className="animate-spin" /> : 'Programar mi Evaluación'}
                                  </button>
                              </div>
                               {formState.status === 'error' && (
                                <div className="mt-4 text-center p-2 rounded-lg bg-red-900/50 border border-red-500 text-red-300 flex items-center justify-center gap-2">
                                  <AlertTriangle size={16} />
                                  <span>{formState.message}</span>
                                </div>
                              )}
                          </div>
                      </form>
                    </>
                    )}
                </div>
            </div>
        </section>
    );
};
