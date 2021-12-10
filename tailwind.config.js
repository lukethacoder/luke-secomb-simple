const XS = '320px'
const SM = '640px'
const MD = '768px'
const LG = '1024px'
const XL = '1280px'
const XXL = '1440px'
const XXXL = '2000px'
const XXXXL = '2560px'

module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    screens: {
      xs: XS,
      sm: SM,
      md: MD,
      lg: LG,
      xl: XL,
      xxl: XXL,
      xxxl: XXXL,
      xxxxl: XXXXL,
    },
    fluidContainer: {
      sm: {
        maxWidth: SM,
        padding: '12px',
      },
      md: {
        maxWidth: MD,
        padding: '16px',
      },
      lg: {
        maxWidth: LG,
        padding: '24px',
      },
      xl: {
        maxWidth: XL,
        padding: '24px',
      },
      xxl: {
        maxWidth: XXL,
        padding: '32px',
      },
      xxxl: {
        maxWidth: XXXL,
        padding: '32px',
      },
    },
    colors: {
      primary: 'var(--theme-primary)',
      secondary: 'var(--theme-secondary)',
      tertiary: 'var(--theme-tertiary)',
      background: 'var(--theme-background)',
      font: 'var(--theme-font)',

      gold: '#FFC87F',
      cream: '#F0E7E1',

      transparent: 'transparent',
      todo: '#117869',

      black: '#050505',
      grey: '#484848',
      white: '#fff',
    },
    spacing: {
      px: '1px',
      '2px': '2px',
      '4px': '4px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      13: '3.25rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      72: '18rem',
      84: '20rem',
      96: '22rem',
      108: '24rem',
      '1/2': '50%',
      full: '100%',
    },
    backgroundColor: (theme) => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    breakInside: ['avoid'],
    borderColor: (theme) => ({
      ...theme('colors'),
      default: theme('colors.grey.300', 'currentColor'),
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      lg: '0.5rem',
      full: '9999px',
    },
    borderWidth: {
      default: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    boxShadow: {
      default:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      none: 'none',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      1: '1 1 0%',
      0: '1 0 auto',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      0: '0',
      default: '1',
    },
    flexShrink: {
      0: '0',
      default: '1',
    },
    fontFamily: {
      sans: [
        'Work Sans',
        'Roboto',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      sansdos: [
        '"Open Sans"',
        'Roboto',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
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
      '2xs': '0.75rem', // 12px
      xs: '0.875rem', // 14px
      xsm: '0.9375rem', // 15px
      sm: '1rem', // 16px
      base: '1.125rem', // 18px
      lg: '1.375rem', // 22px
      xl: '1.5rem', // 24px
      '2xl': '2rem', // 32px
      '3xl': '2.25rem', // 36px
      '4xl': '2.5rem', // 40px
      '5xl': '3.75rem', // 60px
      '6xl': '4rem', // 64px
      '7xl': '5rem', // 80px
      '8xl': '6.5rem', // 120px
      '9xl': '7.5rem', // 120px
      '9xl': '8.375rem', // 134px
      '10xl': '10rem', //
      '11xl': '13rem', //
      '12xl': '15rem', // 240px
    },
    fontWeight: {
      // hairline: '100',
      // thin: '200',
      // light: '300',
      normal: '400',
      // medium: '500',
      // semibold: '600',
      bold: '700',
      // extrabold: '800',
      // black: '900',
    },
    gradientColorStops: (theme) => ({
      ...theme('colors'),
    }),
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    inset: (theme) => ({
      ...theme('spacing'),
      0: '0',
      full: '100%',
      '-full': '-100%',
      auto: 'auto',
      unset: 'unset',
    }),
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      2: '0.5',
      3: '0.75',
      4: '1',
      5: '1.25',
      6: '1.5',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
      screen: '100vw',
      none: 'none',
    },
    maxHeight: (theme) => ({
      ...theme('maxWidth'),
      screen: '100vh',
    }),
    minHeight: {
      0: '0',
      full: '100%',
      screen: '100vh',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      0: '0',
      15: '0.15',
      20: '0.2',
      25: '0.25',
      40: '0.4',
      50: '0.5',
      60: '0.6',
      75: '0.75',
      80: '0.8',
      100: '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
    padding: (theme) => theme('spacing'),
    placeholderColor: (theme) => theme('colors'),
    scale: {
      0: '0',
      100: '1',
      '-100': '-1',
    },
    stroke: {
      current: 'currentColor',
    },
    textColor: (theme) => theme('colors'),
    transitionTimingFunction: {
      perfect: 'cubic-bezier(0, 0, 0.175, 1)',
    },
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      // '1/2': '50%', - MOVED THIS TO THE SPACING DEF
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      inherit: 'inherit',
    }),
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      100: '100',
      200: '200',
    },
    columnCount: [1, 2, 3],
    columnFill: ['auto', 'balance', 'balance-all'],
    columnSpan: ['none', 'all'],
  },
  corePlugins: {},
  plugins: [
    require('tailwindcss-fluid-container')({
      componentPrefix: 'lsd-', // defaults to 'c-'
    }),
    require('tailwindcss-multi-column')(),
    // require('tailwindcss-break')(),
  ],
}
