/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF8F5',
          dot: 'rgba(0, 0, 0, 0.08)',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F2EFE9',
          hover: '#E8E5DF',
        },
        ink: {
          primary: '#1A1917',
          secondary: '#63615A',
          muted: '#96938B',
        },
        border: {
          subtle: 'rgba(0, 0, 0, 0.08)',
          card: 'rgba(0, 0, 0, 0.06)',
        },
        accent: {
          blue: '#3B82F6',
          green: '#10B981',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        },
      },
      fontFamily: {
        handwriting: ['Caveat', 'cursive', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        tactile: '0 8px 20px -6px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'tactile-hover': '0 20px 32px -10px rgba(0, 0, 0, 0.12), 0 6px 12px -4px rgba(0, 0, 0, 0.06)',
        'tactile-active': '0 4px 10px -2px rgba(0, 0, 0, 0.10)',
        dock: '0 24px 48px -12px rgba(0, 0, 0, 0.14), 0 4px 16px -2px rgba(0, 0, 0, 0.06)',
        preview: '0 30px 60px -15px rgba(0, 0, 0, 0.18), 0 10px 24px -5px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        pill: '9999px',
        card: '24px',
        modal: '28px',
      },
    },
  },
  plugins: [],
};
