/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Checks the main HTML file
    './src/**/*.{js,ts,jsx,tsx}', // Checks all JS/TS/JSX files in src
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use Montserrat as the stylish sans-serif
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        // Use Bebas Neue for bold, cinematic headings
        heading: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        // Your SSTRAESS brand palette
        'brand-red': '#E50914',
        'brand-black': '#000000', // OLED black
        'brand-gray-dark': '#141414',
        'brand-gray-light': '#222222',
        'brand-white': '#f5f5f5',

        // Overriding old theme for consistency
        base: '#000000', // New: OLED black
        surface: '#141414', // New: Dark gray
        overlay: '#222222', // New: Light gray
        primary: '#E50914', // New: Netflix red
        secondary: '#b20710', // A darker red for accents
      },
      backgroundImage: {
        // Update gradient to use new red
        'gradient-primary': 'linear-gradient(to right, #E50914, #b20710)',
      },
      boxShadow: {
        // A subtle glow effect for buttons/cards
        'glow-red': '0 0 15px 0 rgba(229, 9, 20, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Good for styling forms
  ],
};