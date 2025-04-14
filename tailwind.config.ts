import type { Config } from "tailwindcss";

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
			colors: {
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
				trustBlue: '#3B82F6',
				verifyGreen: '#10B981',
				cautionAmber: '#F59E0B',
				alertRed: '#EF4444',
				neutralGray: '#F9FAFB',
				darkText: '#1F2937',
				
				// Neumorphic specific colors
				neu: {
					background: '#222222',
					dark: '#1a1a1a',
					light: '#2c2c2c',
					shadow: '#191919',
					highlight: '#2e2e2e',
					text: '#e0e0e0',
					'text-muted': '#a0a0a0',
					accent: '#3b82f6',
					'accent-dark': '#2563eb',
					'accent-light': '#60a5fa',
				},
			},
			boxShadow: {
				'neu-flat': '5px 5px 10px #191919, -5px -5px 10px #2e2e2e',
				'neu-pressed': 'inset 5px 5px 10px #191919, inset -5px -5px 10px #2e2e2e',
				'neu-convex': '5px 5px 10px #191919, -5px -5px 10px #2e2e2e, inset 1px 1px 1px #2e2e2e, inset -1px -1px 1px #191919',
				'neu-concave': 'inset 5px 5px 10px #191919, inset -5px -5px 10px #2e2e2e, 1px 1px 1px #2e2e2e, -1px -1px 1px #191919',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				'pulse-ring': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1.5)',
						opacity: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'scan-line': {
					'0%': {
						top: '0%'
					},
					'50%': {
						top: '100%'
					},
					'100%': {
						top: '0%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'scan-line': 'scan-line 2s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
