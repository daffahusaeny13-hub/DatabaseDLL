/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // biru utama (Tailwind blue-600)
          light: "#3B82F6",   // biru terang
          dark: "#1E40AF",    // biru tua
        },
        secondary: {
          DEFAULT: "#10B981", // hijau (emerald-500)
          light: "#34D399",
          dark: "#047857",
        },
        accent: {
          DEFAULT: "#F59E0B", // oranye (amber-500)
          light: "#FBBF24",
          dark: "#B45309",
        },
        neutral: {
          light: "#F3F4F6",  // abu terang
          dark: "#1F2937",   // abu gelap
        },
      },
    },
  },
  plugins: [],
};
