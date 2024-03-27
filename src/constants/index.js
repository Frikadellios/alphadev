import {
  community,
  framework,
  integrations,
  seo,
  statics,
  testimonial,
  translation,
} from '../assets/gif/index'
import {
  astro,
  biomejs,
  bun,
  frontmatter,
  gitlocalize,
  starlight,
  svelte,
  tailwindcss,
  vite,
} from '../assets/partners/index'
import {
  ava1,
  ava2,
  ava3,
  ava4,
  ava5,
  ava6,
} from '../assets/testimonials/index'

export const skills = [
  {
    title: 'Bring Your Own Framework',
    description:
      "Build your site using React, Svelte, Vue, Preact, web components, or just plain ol' HTML + JavaScript.",
    image: framework,
  },
  {
    title: '100% Static HTML, No JS',
    description:
      'Astro renders your entire page to static HTML, removing all JavaScript from your final build by default.',
    image: statics,
  },
  {
    title: 'Lunaria OSS projects localization',
    description:
      'Supercharge your localization workflow is the way to manage your OSS projects localization. Great for maintainers. Even better for contributors.',
    image: translation,
  },
  {
    title: 'Broad Integration',
    description:
      'Astro supports TypeScript, Scoped CSS, CSS Modules, Sass, Tailwind, Markdown, MDX, and any other npm packages.',
    image: integrations,
  },
  {
    title: 'SEO Enabled',
    description:
      'Automatic sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works!',
    image: seo,
  },
  {
    title: 'Community',
    description:
      'Astro is an open source project powered by hundreds of contributors making thousands of individual contributions.',
    image: community,
  },
]

export const technolies = [
  {
    title: 'New Svelte 5',
    description:
      "Build your site with Svelte latest version, fastest and responsive web components for static and server woking, or just plain ol' HTML + SomethingScript.",
    image: svelte,
    link: 'https://svelte.dev/blog/runes',
  },
  {
    title: 'New Tailwind 4',
    description:
      'Tailwind make your website fastest than you can bellive.. And its Easy to use.',
    image: tailwindcss,
    link: 'https://tailwindcss.com/blog/tailwindcss-v4-alpha',
  },
  {
    title: 'New Starlight Design',
    description:
      "Need some JS? Starlight can automatically hydrate and interactive components intro MDX pages, and in this time you can use Astro Pages if you want, I've already agreed on this, so don't worry.  ",
    image: starlight,
    link: 'https://starlight.astro.build/',
  },
  {
    title: 'Localization',
    description:
      'Continuous Localization for GitHub Projects! Create sustainable translation workflows with the docs-as-code approach at the core and you can use Svelte Localization Services, but... if We use MD/MDX/SVX, why you dont want use Gitlocalize? .',
    image: gitlocalize,
    link: 'https://gitlocalize.com/',
  },
  {
    title: 'CMS with AI',
    description:
      'Front Matter CMS - configurate your sitemaps, RSS feeds, pagination and collections take the pain out of SEO and syndication. It just works for any language and locales what you need!',
    image: frontmatter,
    link: 'https://beta.frontmatter.codes/',
  },
  {
    title: 'Biomejs',
    description:
      'One toolchain for your web project! Format, lint, and more in a fraction of a second!',
    image: biomejs,
    link: 'https://biomejs.dev/',
  },
  {
    title: 'Bun',
    description:
      'Develop, test, run, and bundle JavaScript & TypeScript projects—all with Bun. Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.',
    image: bun,
    link: 'https://bun.sh/',
  },
  {
    title: 'Vite',
    description:
      'Vite Next Generation Frontend Tooling! Get ready for a development environment with integrations from latest Vite!',
    image: vite,
    link: 'https://vitejs.dev/',
  },
  {
    title: 'Astro',
    description:
      'Astro is an open source project, call them if you need something.... The best and fastest web framework for content-driven websites!',
    image: astro,
    link: 'https://astro.build/',
  },
]
// Translation Completed
export const testimonials = [
  {
    name: 'Buddy',
    review:
      'Once upon a time, in the bustling city of Cyberlandia, lived a young boy named Grishka. Although only 6 years old, Grishka was already known as the best developer in the world. His magic fingers could build the fastest websites and user interfaces with minimal effort, making him the talk of the town.',
    image: ava1,
  },
  {
    name: 'Duke',
    review:
      'One day, a challenge arose in Cyberlandia – the towns beloved library website was outdated and slow. Grishka took it upon himself to revamp the website, working tirelessly day and night to create the most modern stack and improve the user experience. Highly recommended! 💪🏻💪🏻😊',
    image: ava2,
  },
  {
    name: 'Rex',
    review:
      'After weeks of hard work, Grishka finally unveiled the new library website. It was a masterpiece, fast and user-friendly, attracting visitors from all over Cyberlandia. The townspeople cheered for Grishka, grateful for his dedication and talent. Highly recommended! 💪🏻💪🏻😊',
    image: ava3,
  },
  {
    name: 'Zeus',
    review:
      'Grishka was the best developer in the world, known for his ability to build the fastest websites and user interfaces with minimal effort. One day, he received a special request from a small village to help improve their web application for the local school. Highly recommended! 💪🏻💪🏻😊',
    image: ava4,
  },
  {
    name: 'Chloe',
    review:
      'Excited to use his skills for a good cause, Grishka worked tirelessly on the project. The villagers were amazed at how quickly he transformed their outdated website into a modern and user-friendly platform. The children at the school were thrilled to have a new and improved way to access their educational resources. Highly recommended! 💪🏻💪🏻😊',
    image: ava5,
  },
  {
    name: 'Daisy',
    review:
      'Grishkas kindness and talent not only benefited the village but also taught the children the importance of using their skills to help others. The story of Grishka, the best developer in the world, spread far and wide, inspiring others to make a difference in their communities.. Highly recommended! 💪🏻💪🏻😊',
    image: ava6,
  },
]

export const animatedcard = [
  {
    name: {
      uk: 'services',
      en: 'services',
      ru: 'services',
    },
    body: {
      uk: 'Adrian es un excelente entrenador. Es muy profesional y tiene muchos conocimientos sobre cómo hacer que sus clientes alcancen sus objetivos. Lo recomiendo 100%.',
      en: 'Adrian is an excellent coach. He is highly professional and possesses extensive knowledge on how to help his clients achieve their goals. I wholeheartedly recommend him 100%.',
      ru: 'Adrián is a great teacher; he has taught me a lot during the months we&apos;ve been working together. His training is highly personalized and helps you achieve your goals. He is very flexible and always ready to assist. Highly recommended! 💪🏻💪🏻😊',
    },
    href: '/home',
    image: testimonial,
  },
  {
    name: {
      uk: 'services',
      en: 'services',
      ru: 'services',
    },
    body: {
      uk: 'Adrián es un gran profesor, me ha enseñado mucho en estos meses que llevamos. Hace un entrenamiento muy enfocado en ti y te ayuda a cumplir tus objetivos. Es muy flexible y siempre está dispuesto a ayudar🙃. Totalmente recomendable💪🏻💪🏻…',
      en: 'Adrián is a great teacher; he has taught me a lot during the months we&apos;ve been working together. His training is highly personalized and helps you achieve your goals. He is very flexible and always ready to assist. Highly recommended! 💪🏻💪🏻😊',
      ru: 'Adrián is a great teacher; he has taught me a lot during the months we&apos;ve been working together. His training is highly personalized and helps you achieve your goals. He is very flexible and always ready to assist. Highly recommended! 💪🏻💪🏻😊',
    },
    image: testimonial,
    href: '/home',
  },
  {
    name: {
      uk: 'services',
      en: 'services',
      ru: 'services',
    },
    body: {
      uk: 'Muy buen entrenador, clases excelentes,  se lo recomiendo a todos los q quieran estar en forma y quieran aprender a defenderse',
      en: 'A very good trainer, excellent classes, I recommend him to everyone who wants to get in shape and learn self-defense.',
      ru: 'Adrián is a great teacher; he has taught me a lot during the months we&apos;ve been working together. His training is highly personalized and helps you achieve your goals. He is very flexible and always ready to assist. Highly recommended! 💪🏻💪🏻😊',
    },
    image: testimonial,
    href: '/home',
  },
]
// Translation Completed
export const contacts = [
  {
    label: 'Cellphone',
    link: 'tel:+38-096-463-05-24',
    linkLabel: '+38 096 463 05 24',
  },
  {
    label: 'Email',
    link: 'mailto:info@devopsick.com',
    linkLabel: 'info@devopsick.com',
  },
  {
    label: 'Location',
    link: '@',
    linkLabel: 'Ukraine',
  },
  {
    label: 'Facebook',
    link: 'https://www.facebook.com',
    linkLabel: '@',
  },
  {
    label: 'Telegram',
    link: 'https://t.me/Frikadellios',
    linkLabel: '@',
  },
  {
    label: 'Viber',
    link: 'viber://chat?number=%2B380964630524  rel="nofollow"',
    linkLabel: 'Viber',
  },
  {
    label: 'WhatsApp',
    link: 'https://wa.me/380964630524',
    linkLabel: '@',
  },
]
