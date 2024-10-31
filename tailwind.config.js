/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px', 
      'lg': '1024px',
      'xl': '1280px',
    },
    colors: {
        'custom-1': 'var(--custom-1)',
        'custom-2': 'var(--custom-2)',
        'custom-3': 'var(--custom-3)',
        'custom-4': 'var(--custom-4)',
        'custom-5': 'var(--custom-5)',
        'custom-gray-1': 'var(--custom-gray-1)',
      },
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
