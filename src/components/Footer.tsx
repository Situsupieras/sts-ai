// src/components/Footer.tsx
"use client";
import React from 'react';

export const Footer = () => (
    <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Si Tu Supieras El Poder de la IA. Todos los derechos reservados.</p>
            <p className="text-sm mt-2">Fecha de la versión de la página: 18/06/2025</p>
            <div className="mt-4 flex justify-center gap-4">
                <a href="#" className="hover:text-white">Política de Privacidad</a>
                <a href="#" className="hover:text-white">Términos de Servicio</a>
            </div>
        </div>
    </footer>
);
