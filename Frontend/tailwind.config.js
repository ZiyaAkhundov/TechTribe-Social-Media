/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      time:"Roboto, Helvetica, Arial, sans-serif"
    },
    fontSize: {
      "1":"1rem",
      "1.5":"1.5rem",
      "23":"23px",
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
    colors:{
      active: '#d4d7d3',
      bgMain: '#fff',
      messengerAside:" #f0f0f0",
      searchFocus: "#fdfdff",
      search:"#f7f7f7",
      auth:"#4d018a"
      
    },
    backgroundImage:{
      footer: 'linear-gradient(90deg, rgba(177,174,239,1) 0%, rgba(248,160,160,1) 55%, rgba(170,210,134,1) 91%)',
      instagram: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);'
    },
    boxShadow: {
      home:"rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;",
      feed:" 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);"
    },
    maxWidth: {
      '600': '600px',
    },
    width: {
      '600': '600px',
      '70':"70%",
      '90':"90%"
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    translate: {
      '250': '-250px',
    },
    height: {
      '100dvh': '100dvh',
      "93dvh": '93dvh',
      "100-60": 'calc(100% - 60px)'

    },
    margin: {
      '25rem': '25rem',
      '16px':'16px'
    }
    },
  },
  plugins: [],
}

