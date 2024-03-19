import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from "@astrojs/svelte";
import AutoImport from 'unplugin-auto-import/astro';
import starlight from "@astrojs/starlight";
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: "lightningcss"
    }
  },
  integrations: [
    AutoImport({
    imports: [
      'svelte',
      'svelte/store',
    ],
    dts: './src/auto-imports.d.ts',
  }),
  tailwindcss(), 
  svelte(), 
  starlight({
    title: 'My Docs',
    customCss: [
      // Relative path to your custom CSS file
      './src/styles/docs.css',
    ],
    plugins: [starlightBlog({
      authors: {
        devopsick: {
          name: 'Hrihorii Ilin',
          title: 'Starlight Devopsick',
          picture: '/avatar.webp', // Images in the `public` directory are supported.
          url: 'https://example.dev',
        },
      },
    })],
  }),]
});