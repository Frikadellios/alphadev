import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from "@astrojs/svelte";
import AutoImport from 'unplugin-auto-import/astro';
import starlight from "@astrojs/starlight";
import starlightBlog from 'starlight-blog';
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import liveCode from 'astro-live-code'
import expressiveCode from "astro-expressive-code";
import { mdsvex } from 'mdsvex';
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
    imports: ['svelte', 'svelte/store'],
    dts: './src/auto-imports.d.ts'
  }), 
  tailwindcss(), 
  svelte({
    extensions: ['.svelte', '.svx'],
    preprocess: mdsvex({
      extensions: ['.svx'], }),
    }), 
    starlight({
    title: 'My Docs',
    customCss: [
    // Relative path to your custom CSS file
    './src/styles/docs.css'],
    plugins: [starlightBlog({
      authors: {
        devopsick: {
          name: 'Hrihorii Ilin',
          title: 'Starlight Devopsick',
          picture: '/avatar.webp',
          // Images in the `public` directory are supported.
          url: 'https://example.dev'
        }
      }
    })]
  }), 
  sitemap(), 
  partytown(), 
  expressiveCode(), 
  liveCode({
    layout: './src/MyLayout.astro',
  }), 
  mdx(),]
});