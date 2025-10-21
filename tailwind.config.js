export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "Georgia", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#ffffff",
          "primary-focus": "#e5e5e5",
          "primary-content": "#000000",
          secondary: "#ffffff",
          "secondary-focus": "#e5e5e5",
          "secondary-content": "#000000",
          accent: "#ffffff",
          "accent-focus": "#e5e5e5",
          "accent-content": "#000000",
          neutral: "#0a0a0a",
          "neutral-focus": "#000000",
          "neutral-content": "#e5e5e5",
          "base-100": "#000000",
          "base-200": "#0a0a0a",
          "base-300": "#1a1a1a",
          "base-content": "#ffffff",
          info: "#ffffff",
          success: "#ffffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
};
