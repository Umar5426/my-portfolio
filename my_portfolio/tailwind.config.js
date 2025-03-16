/** @type {import('tailwindcss').Config} */
const config = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#2a004a',
        darkTheme: '#11001f',
      },
      fontFamily: {
        Outfit: ['Outfit', 'sans-serif'],
        Ovo: ['Ovo', 'serif'],
      },
    },
  }, 
  plugins: []
};

export default config;