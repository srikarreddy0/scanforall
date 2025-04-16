import type { Config } from "tailwindcss";

// Colors configuration
const colors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))'
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))'
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))'
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))'
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))'
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))'
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))'
  },
  sidebar: {
    DEFAULT: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))'
  },
  
  // Premium UI color scheme
  premium: {
    50: '#E6F4FF',
    100: '#CCE9FF',
    200: '#99D3FF',
    300: '#66BDFF',
    400: '#33A7FF',
    500: '#0091FF', // Main blue accent from image
    600: '#0077CC',
    700: '#005C99',
    800: '#004166',
    900: '#002733',
    950: '#001A26',
  },
  dark: {
    100: '#2A2F3C', // Lighter shade
    200: '#1E2330', // Card background
    300: '#161B26', // Main background
    400: '#121622',
    500: '#0E111B',
    900: '#090C14',
  },
  light: {
    100: '#FFFFFF',
    200: '#F9FAFC',
    300: '#F4F5F9',
    400: '#EAECF2',
    500: '#DFE2EC',
    600: '#C5CAD9',
  },
  accent1: {
    DEFAULT: '#F95738',
    dark: '#D03A1F',
    light: '#FFA799',
  },
  accent2: {
    DEFAULT: '#37DBFF',
    dark: '#00A3C4',
    light: '#B9F1FF',
  },
  success: {
    DEFAULT: '#32D583',
    50: 'rgba(50, 213, 131, 0.1)',
    100: 'rgba(50, 213, 131, 0.2)',
    foreground: '#32D583', // Adding this to ensure text-success-DEFAULT works
  },
  warning: {
    DEFAULT: '#FFA800',
    50: 'rgba(255, 168, 0, 0.1)',
    100: 'rgba(255, 168, 0, 0.2)',
    foreground: '#FFA800', // Adding for consistency
  },
  error: {
    DEFAULT: '#F04438',
    50: 'rgba(240, 68, 56, 0.1)',
    100: 'rgba(240, 68, 56, 0.2)',
    foreground: '#F04438', // Adding for consistency
  },
};

// Shadow configuration
const boxShadow = {
  'premium-xs': '0px 1px 2px rgba(16, 24, 40, 0.05)',
  'premium-sm': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  'premium-md': '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
  'premium-lg': '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
  'premium-xl': '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
  'premium-2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
  'premium-3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
  'premium-inner': 'inset 0 2px 4px 0 rgba(16, 24, 40, 0.06)',
  'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  'glow-premium': '0 0 20px rgba(0, 145, 255, 0.5)',
  'glow-success': '0 0 20px rgba(50, 213, 131, 0.5)',
  'glow-warning': '0 0 20px rgba(255, 168, 0, 0.5)',
  'glow-error': '0 0 20px rgba(240, 68, 56, 0.5)',
};

// Gradients configuration
const backgroundImage = {
  'gradient-premium': 'linear-gradient(135deg, #0091FF 0%, #006DC1 100%)',
  'gradient-dark': 'linear-gradient(135deg, #1E2330 0%, #161B26 100%)',
  'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F4F5F9 100%)',
  'gradient-success': 'linear-gradient(135deg, #32D583 0%, #0B9E5A 100%)',
  'gradient-warning': 'linear-gradient(135deg, #FFA800 0%, #CC7A00 100%)',
  'gradient-error': 'linear-gradient(135deg, #F04438 0%, #B3261E 100%)',
  'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
  'glass-dark': 'linear-gradient(135deg, rgba(30, 35, 48, 0.8) 0%, rgba(30, 35, 48, 0.6) 100%)',
};

// Animations and keyframes
const keyframes = {
  'accordion-down': {
    from: {
      height: '0'
    },
    to: {
      height: 'var(--radix-accordion-content-height)'
    }
  },
  'accordion-up': {
    from: {
      height: 'var(--radix-accordion-content-height)'
    },
    to: {
      height: '0'
    }
  },
  'pulse-glow': {
    '0%, 100%': {
      boxShadow: '0 0 20px rgba(79, 116, 255, 0.2)',
    },
    '50%': {
      boxShadow: '0 0 20px rgba(79, 116, 255, 0.6)',
    },
  },
  'float': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
  'shine': {
    from: {
      backgroundPosition: '200% 0',
    },
    to: {
      backgroundPosition: '-200% 0',
    },
  },
  'shimmer': {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  'scan-line': {
    '0%': {
      top: '0%',
      opacity: '0.2',
    },
    '50%': {
      top: '100%',
      opacity: '1',
    },
    '100%': {
      top: '0%',
      opacity: '0.2',
    },
  },
  'fade-in': {
    '0%': {
      opacity: '0',
      transform: 'translateY(10px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  'ripple': {
    '0%': {
      transform: 'scale(0)',
      opacity: '1',
    },
    '100%': {
      transform: 'scale(2.5)',
      opacity: '0',
    },
  },
};

// Animation configuration
const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'float': 'float 3s ease-in-out infinite',
  'shine': 'shine 8s ease-in-out infinite',
  'shimmer': 'shimmer 1.5s infinite',
  'scan-line': 'scan-line 2s linear infinite',
  'fade-in': 'fade-in 0.5s ease-out',
  'ripple': 'ripple 1s cubic-bezier(0, 0, 0.2, 1)',
};

// Font families
const fontFamily = {
  sans: ['Inter var', 'Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
  display: ['Satoshi', 'sans-serif'],
};

// Border radius
const borderRadius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors,
      fontFamily,
      borderRadius,
      boxShadow,
      backgroundImage,
      keyframes,
      animation,
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
