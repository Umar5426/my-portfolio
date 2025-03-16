/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
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
};
export const plugins = [];