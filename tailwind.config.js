/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-1': 'var(--custom-1)',
        'custom-2': 'var(--custom-2)',
        'custom-3': 'var(--custom-3)',
        'custom-4': 'var(--custom-4)',
        'custom-5': 'var(--custom-5)',
        'custom-6': 'var(--custom-6)',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'h1': '70px',
        'h2': '60px',
        'h3': '30px',
        'p': '20px',
        'sign': '20px',
      },
    },
  },
  plugins: [],
};
