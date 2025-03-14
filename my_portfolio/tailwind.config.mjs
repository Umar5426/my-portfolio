/**@type{import('tailwindcss').Config*/
// eslint-disable-next-line import/no-anonymous-default-export
export default{
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colours:{
        lightHover: '#fcf4ff',
        darkHover: '#2a004a',
        darkTheme: '#11001f'
      },
      fontFamily: {
        Outfit: ['Outfit', 'sans-serif'],
        Ovo: ['Ovo', 'serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}