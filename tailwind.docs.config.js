import starlightPlugin from '@astrojs/starlight-tailwind'
import animatePlugin from 'tailwindcss-animate'

// Generated color palettes in "./src/styles/*"

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      ...colors,
    }
  },
  plugins: [starlightPlugin(), animatePlugin],
}
