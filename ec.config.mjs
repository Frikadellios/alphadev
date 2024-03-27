import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  plugins: [
    // Call the plugin initialization function inside the `plugins` array
    pluginCollapsibleSections(),
  ],
    themes: ['material-theme-ocean', 'material-theme-palenight'],
    styleOverrides: {
      // You can also override styles
      borderRadius: '0.5rem',
      frames: {
        shadowColor: '#124',
      },
    },
  }