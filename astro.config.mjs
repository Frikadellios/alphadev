import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import lunaria from '@lunariajs/starlight';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import liveCode from 'astro-live-code';
import { defineConfig } from 'astro/config';
import { mdsvex } from 'mdsvex';
import starlightBlog from 'starlight-blog';
import AutoImport from 'unplugin-auto-import/astro';
import node from "@astrojs/node";

const locales = {
  root: {
    label: 'English',
    lang: 'en'
  },
  pt: {
    label: 'Português',
    lang: 'pt'
  },
  de: {
    label: 'Deutsch',
    lang: 'de'
  },
  ru: {
    label: 'Русский',
    lang: 'ru'
  },
  uk: {
    label: 'Українська',
    lang: 'uk'
  },
  es: {
    label: 'Español',
    lang: 'es'
  },
  fr: {
    label: 'Français',
    lang: 'fr'
  }
};


// https://astro.build/config
export default defineConfig({
  site: 'https://alphadev.vercel.app',
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: 'lightningcss'
    }
  },
  integrations: [AutoImport({
    imports: ['svelte', 'svelte/store'],
    dts: './src/auto-imports.d.ts'
  }), tailwindcss(), svelte({
    extensions: ['.svelte', '.svx'],
    preprocess: mdsvex({
      extensions: ['.svx']
    })
  }), starlight({
    title: 'AlphaDEV',
    titleDelimiter: '—',
    lastUpdated: true,
    logo: {
      light: './src/assets/alphadev-logo/alpha-favicon-black.png',
      dark: './src/assets/alphadev-logo/alpha-favicon-white.png',
      replacesTitle: true
    },
    favicon: '/favicon.ico',
    locales,
    sidebar: [{
      label: 'Start Here',
      translations: {
        de: 'Beginne hier',
        es: 'Comienza aqui',
        fr: 'Commencez ici',
        it: 'Inizia qui',
        pt: 'Comece Aqui',
        ru: 'Начать отсюда',
        uk: 'Почніть звідси'
      },
      items: [{
        label: 'Getting Started',
        link: 'getting-started',
        translations: {
          de: 'Erste Schritte',
          es: 'Empezando',
          fr: 'Mise en route',
          it: 'Iniziamo',
          pt: 'Introdução',
          ru: 'Введение',
          uk: 'Вступ'
        }
      }, {
        label: 'Manual Setup',
        link: 'manual-setup',
        translations: {
          de: 'Manuelle Einrichtung',
          es: 'Configuración Manual',
          fr: 'Installation manuelle',
          pt: 'Instalação Manual',
          ru: 'Установка вручную',
          uk: 'Ручне встановлення'
        }
      }, {
        label: 'Environmental Impact',
        link: 'environmental-impact',
        translations: {
          de: 'Umweltbelastung',
          es: 'Documentación ecológica',
          fr: 'Impact environnemental',
          it: 'Impatto ambientale',
          pt: 'Impacto Ambiental',
          ru: 'Влияние на окружающую среду',
          uk: 'Вплив на довкілля'
        }
      }]
    }, {
      label: 'Guides',
      translations: {
        de: 'Anleitungen',
        es: 'Guías',
        fr: 'Guides',
        it: 'Guide',
        pt: 'Guias',
        ru: 'Руководства',
        uk: 'Ґайди'
      },
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: 'Reference',
      translations: {
        de: 'Referenz',
        es: 'Referencias',
        fr: 'Référence',
        it: 'Riferimenti',
        pt: 'Referência',
        ru: 'Справочник',
        uk: 'Довідник'
      },
      autogenerate: {
        directory: 'reference'
      }
    }, {
      label: 'Resources',
      badge: 'New',
      translations: {
        fr: 'Ressources',
        pt: 'Recursos',
        ru: 'Ресурсы',
        uk: 'Ресурси'
      },
      autogenerate: {
        directory: 'resources'
      }
    }],
    social: {
      discord: 'https://astro.build/',
      gitlab: 'https://gitlab.com/',
      threads: 'https://www.threads.net/',
      twitch: 'https://www.twitch.tv/',
      twitter: 'https://twitter.com/devopsick',
      'x.com': 'https://x.com/@devopsick',
      youtube: 'https://youtube.com/devopsick',
      github: 'https://github.com/Frikadellios/alphadev'
    },
    customCss: ['@fontsource/geist-sans', './src/styles/globalcss/index.css', './tailwind.docs.css', './src/styles/docs.css'],
    plugins: [lunaria({
      configPath: './lunaria.config.json',
      // The desired route to render the Lunaria dashboard.
      route: './lunaria',
      // Option to enables syncing the Lunaria configuration file
      // with Starlight's configuration whenever you run
      // `astro build`, populating the Lunaria config's `defaultLocale`,
      // `locales`, and `files` fields automatically.
      sync: false
    }), starlightBlog({
      authors: {
        devopsick: {
          name: 'Hrihorii Ilin',
          title: 'AlphaDev Devopsick Starter Template',
          picture: '/favicon.ico',
          // Images in the `public` directory are supported.
          url: 'https://github.com/Frikadellios'
        }
      },
      recentPostCount: 7
    })]
  }), sitemap(), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), expressiveCode(), liveCode({
    layout: './src/content/LiveCodeLayout.astro'
  }), mdx()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});