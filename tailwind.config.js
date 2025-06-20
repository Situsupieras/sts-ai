// sts-ai/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Establece 'Inter' como la fuente por defecto para la clase 'sans'
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Paleta de colores del 'Proyecto Fénix' para consistencia
        'brand-blue': '#38bdf8',
        'brand-indigo': '#818cf8',
        'brand-slate': {
          light: '#334155',    // slate-700
          DEFAULT: '#1e293b', // slate-800
          dark: '#0f172a',     // slate-900
          darkest: '#020617', // slate-950
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
