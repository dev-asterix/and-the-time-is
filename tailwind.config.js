module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "nova-flat": '"Nova Flat"',
      "proxima-nova": '"Proxima Nova"',
    },
    extend: {
      colors: {
        'brand-dark': '#0f172a',
        'brand-darker': '#020617',
        'brand-primary': '#3b82f6',
        'brand-secondary': '#8b5cf6',
        'brand-accent': '#06b6d4',
        'brand-success': '#10b981',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.4)',
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
