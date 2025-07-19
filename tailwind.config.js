/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins-Regular", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-thin": ["Poppins-Thin", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
      },
      colors: {
        primary: '#4CAF50',
        primaryDark: '#388E3C',
        accent: '#FFC107',
        background: '#F5F5F5',
        card: '#FFFFFF',
        textPrimary: '#212121',
        textLight: '#666666',
        textSecondary: '#666666',
        danger: '#D32F2F',
        success: '#388E3C',
        black: {
            DEFAULT: '#000000',
            100: '#8C8E98',
            dark: '#111111',
            darkGray: "#333333",
        }

      }
    },
  },
  plugins: [],
}