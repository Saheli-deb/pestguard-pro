/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core Colors */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* near-black */
        border: 'var(--color-border)', /* light gray */
        input: 'var(--color-input)', /* light neutral gray */
        ring: 'var(--color-ring)', /* deep forest green */
        
        /* Card Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* near-black */
        },
        
        /* Popover Colors */
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* near-black */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* light neutral gray */
          foreground: 'var(--color-muted-foreground)' /* medium gray */
        },
        
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* rich earth brown */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Destructive Colors */
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm orange-red */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* Success Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* vibrant green */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        /* Warning Colors */
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-orange */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        /* Error Colors */
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        /* Surface Color */
        surface: 'var(--color-surface)', /* light neutral gray */
        
        /* Text Colors */
        'text-primary': 'var(--color-text-primary)', /* near-black */
        'text-secondary': 'var(--color-text-secondary)' /* medium gray */
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['IBM Plex Sans', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
        'sans': ['Source Sans 3', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'agricultural': '0 1px 3px rgba(45, 80, 22, 0.1), 0 4px 6px rgba(45, 80, 22, 0.05)',
        'agricultural-lg': '0 10px 25px rgba(45, 80, 22, 0.15)'
      },
      animation: {
        'pulse-slow': 'pulse 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-down': 'slideDown 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      transitionTimingFunction: {
        'agricultural': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'agricultural-slow': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}