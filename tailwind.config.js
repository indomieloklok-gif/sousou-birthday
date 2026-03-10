/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: '#FF4655',
          dark: '#0F1923',
          light: '#ECE8E1',
          accent: '#FF4655',
        },
      },
      fontFamily: {
        gaming: ['Orbitron', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #FF4655, 0 0 10px #FF4655, 0 0 15px #FF4655' },
          '100%': { textShadow: '0 0 10px #FF4655, 0 0 20px #FF4655, 0 0 30px #FF4655, 0 0 40px #FF4655' },
        },
      },
    },
  },
  plugins: [],
}
