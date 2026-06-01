/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#03030A',
        surface: '#080814',
        's2': '#0D0D1E',
        's3': '#111128',
        primary: '#6366F1',
        'primary-light': '#818CF8',
        secondary: '#8B5CF6',
        accent: '#22D3EE',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'gradient-text': 'linear-gradient(135deg, #818CF8, #A78BFA, #22D3EE)',
        'gradient-hero': 'radial-gradient(ellipse 100% 70% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 65%)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 60%)',
        'gradient-border': 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.5))',
      },
      boxShadow: {
        'glow': '0 0 50px rgba(99,102,241,0.3)',
        'glow-sm': '0 0 25px rgba(99,102,241,0.2)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.25)',
        'button': '0 4px 24px rgba(99,102,241,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(99,102,241,0.6)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

