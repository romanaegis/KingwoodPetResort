/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core brand colors – keep these, they're nice
        primary: '#083642',
        'primary-container': '#254d59',
        'on-primary': '#ffffff',
        'on-primary-container': '#95bdcb',
        'on-primary-fixed': '#001f27',
        'on-primary-fixed-variant': '#244c58',

        secondary: '#516530',
        'secondary-container': '#d0e9a5',
        'on-secondary-container': '#556933',
        'on-secondary': '#ffffff',

        tertiary: '#492b07',
        'tertiary-container': '#62411c',
        'on-tertiary-container': '#ddae80',
        'on-tertiary': '#ffffff',

        // Surfaces – this is the "organic layered" feel you like
        background: '#fbf9f8',
        surface: '#fbf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f2',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae8e7',
        'surface-container-highest': '#e4e2e1',

        'on-surface': '#1b1c1c',
        'on-surface-variant': '#41484b',
        'on-background': '#1b1c1c',

        outline: '#71787b',
        'outline-variant': '#c1c8cb',

        error: '#ba1a1a',
        // Add more if you spot them being used (e.g. surface-dim, inverse-surface…)
      },
      fontFamily: {
        headline: ['Noto Serif', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        label: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '3xl': '1.5rem',   // you use rounded-[3rem] in some places
        full: '9999px',
      },
    },
  },
  plugins: [], // you can add forms, typography later if needed
}