import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './timetable.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0B',
        coal: '#151513',
        concrete: '#232320',
        slab: '#36352F',
        dust: '#8E8B82',
        chalk: '#EDEAE3',
        signal: '#FF4F1F',
        'signal-deep': '#D63A0F',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Archivo Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0',
      },
    },
  },
  plugins: [],
} satisfies Config
