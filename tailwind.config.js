/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e73103',
          orange: '#f58e1e',
        },
        dark: {
          600: '#1a1a1a',
          700: '#111111',
          800: '#0a0a0a',
          900: '#060606',
          950: '#030303',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          elevated: 'rgba(255,255,255,0.05)',
          strong: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.1)',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': `
          radial-gradient(circle at 12% 12%, rgba(245,142,30,0.18), transparent 26%),
          radial-gradient(circle at 86% 20%, rgba(231,49,3,0.18), transparent 24%),
          linear-gradient(180deg, #080808 0%, #050505 100%)
        `,
        'brand-gradient': 'linear-gradient(135deg, #e73103, #f58e1e)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(231,49,3,0.15), rgba(245,142,30,0.1))',
        'card-surface': 'rgba(255,255,255,0.04)',
      },
      boxShadow: {
        'brand': '0 20px 52px rgba(231,49,3,0.22)',
        'brand-lg': '0 0 60px rgba(231,49,3,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.25)',
        'card-hover': '0 12px 40px rgba(231,49,3,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'count-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
