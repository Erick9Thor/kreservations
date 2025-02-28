const plugin = require('tailwindcss/plugin');

function withOpacityValue(variable) {
  return ({opacityValue}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(var(${variable}), ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  theme: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
    },
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        neutral: {
          450: '#828282',
          650: '#4F4F4F'
        },
        'contrast-black': 'black',
        'contrast-white': 'white',
        white: {
          light: '#FFFFFF',
          DEFAULT: '#FFFFFF',
        },
        gray: {
          light: 'rgba(158, 158, 158, 0.1)',
          DEFAULT: 'rgb(158, 158, 158)',
        },
        red: {
          light: 'rgba(244, 67, 54, 0.1)',
          DEFAULT: 'rgb(244, 67, 54)',
        },
        orange: {
          light: 'rgba(255, 152, 0, 0.1)',
          DEFAULT: 'rgb(255, 152, 0)',
        },
        'deep-orange': {
          light: 'rgba(255, 87, 34, 0.1)',
          DEFAULT: 'rgb(255, 87, 34)',
        },
        amber: {
          light: 'rgba(255, 193, 7, 0.1)',
          DEFAULT: 'rgb(255, 193, 7)',
        },
        green: {
          light: 'rgba(76, 175, 80, 0.1)',
          DEFAULT: 'rgb(76, 175, 80)',
        },
        teal: {
          light: 'rgba(0, 150, 136, 0.1)',
          DEFAULT: 'rgb(0, 150, 136)',
        },
        cyan: {
          light: 'rgba(0, 188, 212, 0.1)',
          DEFAULT: 'rgb(0, 188, 212)',
        },
        purple: {
          light: 'rgba(156, 39, 176, 0.1)',
          DEFAULT: 'rgb(156, 39, 176)',
        },
        'deep-purple': {
          light: 'rgba(103, 58, 183, 0.1)',
          DEFAULT: 'rgb(103, 58, 183)',
        },
        pink: {
          light: 'rgba(233, 30, 99, 0.1)',
          DEFAULT: 'rgb(233, 30, 99)',
        },
        'primary': {
          50: '#FBE9E7',
          100: '#FFCCBC',
          200: '#FFAB91',
          300: '#FF8A65',
          400: '#FF7043',
          500: '#FF5722',
          // 500:  withOpacityValue('--color-primary'),
          600: '#F4511E',
          700: '#E64A19',
          800: '#D84315',
          900: '#BF360C',
          DEFAULT: withOpacityValue('--color-primary')
        },
        'accent': {
          50: '#EFEBE9',
          100: '#D7CCC8',
          200: '#BCAAA4',
          300: '#A1887F',
          400: withOpacityValue('--color-accent'),
          500: '#795548',
          600: '#6D4C41',
          700: '#5D4037',
          800: '#4E342E',
          900: '#3E2723',
          DEFAULT: withOpacityValue('--color-accent')
        },
        'warn': {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: withOpacityValue('--color-warn'),
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71b1c',
          DEFAULT: withOpacityValue('--color-warn')
        }
      },
      spacing: {
        gutter: 'var(--padding-gutter)',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        base: 'var(--background-base)',
        foreground: withOpacityValue('--background-foreground-rgb'),
        'app-bar': 'var(--background-app-bar)',
        hover: 'var(--background-hover)',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: 'var(--foreground-divider)',
        divider: 'var(--foreground-divider)',
      }),
      borderRadius: {
        none: '0px',
        xs: 'calc(var(--border-radius) * 0.25)',
        sm: 'calc(var(--border-radius) * 0.5)',
        DEFAULT: 'var(--border-radius)',
        md: 'calc(var(--border-radius) * 1.25)',
        lg: 'calc(var(--border-radius) * 1.5)',
        xl: 'calc(var(--border-radius) * 1.75)',
        '2xl': 'calc(var(--border-radius) * 2)',
        full: '9999px',
        button: 'var(--button-border-radius)',
      },
      boxShadow: {
        b: '0 10px 30px 0 rgba(82,63,104,.06)'
      },
      fontFamily: {
        sans: [
          '"Inter var"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple ColorDef Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto ColorDef Emoji"',
        ],
        serif: [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      margin: (theme, {negative}) => ({
        ...negative({
          gutter: 'var(--padding-gutter)'
        })
      }),
      textColor: theme => ({
        ...theme('colors'),
        black: 'var(--text-color)',
        white: '#FFFFFF',
        //white: 'var(--text-color-light)',
        'secondary': 'var(--text-secondary)',
        'hint': 'var(--text-hint)',
        'primary-contrast': 'rgb(var(--color-primary-contrast))',
        'accent-contrast': 'rgb(var(--color-accent-contrast))',
        'warn-contrast': 'rgb(var(--color-warn-contrast))',
        'red-contrast': '#FFF',
        'green-contrast': '#FFF',
        'amber-contrast': '#000',
        'orange-contrast': '#000',
        'deep-orange-contrast': '#FFF',
        'purple-contrast': '#FFF',
        'deep-purple-contrast': '#FFF',
        'cyan-contrast': '#FFF',
        'teal-contrast': '#FFF',
        'gray-contrast': '#FFF',
        'light-green-contrast': '#000',
      }),
      placeholderColor: {
        black: 'var(--text-color)',
        white: 'var(--text-color-light)',
        secondary: 'var(--text-secondary)',
      },
      maxWidth: {
        '3xs': '16rem',
        '2xs': '18rem',
      }
    }
  },
  plugins: [
    plugin(function ({addUtilities}) {
      addUtilities({
        '.icon-xs': {
          'font-size': '1rem',
          'height': '1rem',
          'width': '1rem',
          'line-height': '1rem'
        },
        '.icon-sm': {
          'font-size': '1.25rem',
          'height': '1.25rem',
          'width': '1.25rem',
          'line-height': '1.25rem'
        },
        '.icon-base': {
          'font-size': '1.5rem',
          'height': '1.5rem',
          'width': '1.5rem',
          'line-height': '1.5rem'
        },
        '.icon-lg': {
          'font-size': '1.75rem',
          'height': '1.75rem',
          'width': '1.75rem',
          'line-height': '1.75rem'
        },
        '.icon-xl': {
          'font-size': '2rem',
          'height': '2rem',
          'width': '2rem',
          'line-height': '2rem'
        },
        '.icon-2xl': {
          'font-size': '2.25rem',
          'height': '2.25rem',
          'width': '2.25rem',
          'line-height': '2.25rem'
        },
        '.icon-3xl': {
          'font-size': '2.5rem',
          'height': '2.5rem',
          'width': '2.5rem',
          'line-height': '2.5rem'
        },
        '.icon-4xl': {
          'font-size': '2.75rem',
          'height': '2.75rem',
          'width': '2.75rem',
          'line-height': '2.75rem'
        },
        '.icon-5xl': {
          'font-size': '3rem',
          'height': '3rem',
          'width': '3rem',
          'line-height': '3rem'
        }
      })
    })
  ],
  corePlugins: {
    container: false
  }
};
