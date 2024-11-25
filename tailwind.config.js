/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FDF8F6',
          100: '#F9E8E3',
          200: '#F5D0C5',
          300: '#E7B3A4',
          400: '#E19B89',
          500: '#D67D66',
          600: '#C65D45',
          700: '#B44A31',
          800: '#953D2B',
          900: '#7A3325',
        },
        stone: {
          850: '#292524',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
  // Optimera Tailwind för produktion
  future: {
    hoverOnlyWhenSupported: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}