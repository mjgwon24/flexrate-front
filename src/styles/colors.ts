export const primitiveColor = {
  background: {
    wt: '#ffffff',
    bk: '#000000',
    cardBg: '#f9fafb',
  },
  blue: {
    950: '#00223d',
    900: '#003a68',
    800: '#005293',
    700: '#006abe',
    600: '#0081e9',
    primary: '#008eff',
    400: '#3faaff',
    300: '#6abdff',
    200: '#95d0ff',
    100: '#c0e3ff',
    50: '#ebf6ff',
  },
  gray: {
    950: '#1c1f21',
    900: '#2f3439',
    800: '#434a50',
    700: '#576067',
    600: '#69747d',
    500: '#7f8b94',
    400: '#97a0a7',
    300: '#aeb5bb',
    200: '#c5cacf',
    100: '#dde0e2',
    50: '#f4f5f6',
  },
  red: {
    500: '#ff6969',
    50: '#ffe1e1',
  },
  green: ' #51b13a',
  yellow: '#ffec98',
} as const;

export const semanticColor = {
  text: {
    normal: {
      primary: primitiveColor.background.bk,
      sub1: primitiveColor.gray[900],
      sub2: primitiveColor.gray[600],
      sub3: primitiveColor.gray[300],
      sub4: primitiveColor.gray[100],
      accent: primitiveColor.blue.primary,
      onPrimary: primitiveColor.background.wt,
    },
    state: {
      textError: primitiveColor.red[500],
      textSuccess: primitiveColor.blue.primary,
      textInfo: primitiveColor.gray[200],
    },
  },
  bg: {
    default: primitiveColor.background.wt,
    primary: primitiveColor.blue.primary,
    subtle: primitiveColor.gray[50],
  },
  icon: {
    active: {
      default: primitiveColor.gray[900],
      subtitle: primitiveColor.gray[200],
      error: primitiveColor.red[500],
    },
  },
  card: {
    card1: primitiveColor.background.wt,
  },
  border: {
    active: {
      primary: primitiveColor.blue.primary,
      active: primitiveColor.red[500],
      default: primitiveColor.gray[900],
      sub2: primitiveColor.gray[600],
      sub3: primitiveColor.gray[300],
      sub4: primitiveColor.gray[100],
    },
    inactive: {
      default: primitiveColor.gray[100],
    },
    card: {
      card1: primitiveColor.background.wt,
    },
  },
  bgBtn: {
    active: {
      primary: primitiveColor.blue.primary,
      secondary: primitiveColor.blue[50],
      tertiary: primitiveColor.blue[100],
      error: primitiveColor.red[50],
      wt: primitiveColor.background.wt,
      bk: primitiveColor.background.bk,
      sub1: primitiveColor.gray[600],
      sub3: primitiveColor.gray[300],
    },
    inactive: {
      default: primitiveColor.gray[100],
      sub1: primitiveColor.gray[50],
    },
  },
};

export type SemanticColor = typeof semanticColor;
