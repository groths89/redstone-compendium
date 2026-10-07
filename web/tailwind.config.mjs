/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: '#090D16',
          panel: '#0F172A',
          card: '#1E293B',
          hover: '#334155',
        },
        signal: {
          red: '#EF4444',
          'red-bright': '#FF5451',
          cyan: '#06B6D4',
          'cyan-bright': '#4CD7F6',
          amber: '#F59E0B',
          'amber-bright': '#FFB95F',
          gray: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 12px rgba(239, 68, 68, 0.35)',
        'glow-cyan': '0 0 12px rgba(6, 182, 212, 0.35)',
        'glow-amber': '0 0 12px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
};