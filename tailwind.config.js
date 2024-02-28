import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    // Check .container implementation more below
    container: false
  },
  theme: {
    extend: {
      maxWidth: {
        container: '1536px'
      }
    }
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: theme('maxWidth.container'),
          marginLeft: 'auto',
          marginRight: 'auto',
          '--container-px': theme('spacing.4'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),

          '@screen lg': {
            '--container-px': theme('spacing.24'),
            paddingLeft: theme('spacing.24'),
            paddingRight: theme('spacing.24')
          }
        }
      });
    })
  ]
};
