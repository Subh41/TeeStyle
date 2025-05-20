/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Starry Night-inspired color palette
        'night-blue': '#1a237e',
        'deep-blue': '#283593',
        'starry-blue': '#3949ab',
        'twilight': '#5c6bc0',
        'night-sky': '#121858',
        'star-yellow': '#ffd54f',
        'star-gold': '#ffca28',
        
        // Comic-inspired colors
        'comic-red': '#d32f2f',
        'comic-blue': '#1976d2',
        'hero-blue': '#01579b',
        'hero-red': '#b71c1c',
        'villain-purple': '#4a148c',
        'action-yellow': '#ffc107',
      },
      fontFamily: {
        comic: ['Bangers', 'cursive'],
        hero: ['Bebas Neue', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'starry-pattern': "url('/src/assets/starry-bg.png')",
        'comic-pattern': "url('/src/assets/comic-bg.png')",
      },
      boxShadow: {
        'hero': '0 4px 6px -1px rgba(25, 118, 210, 0.5), 0 2px 4px -1px rgba(25, 118, 210, 0.06)',
        'villain': '0 4px 6px -1px rgba(74, 20, 140, 0.5), 0 2px 4px -1px rgba(74, 20, 140, 0.06)',
      },
      animation: {
        'pulse-star': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'zoom-in-out': 'zoom 3s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
