const colors = {
  primaryGradient: 'linear-gradient(62deg, #8E2DE2 8.16%, #4F46E5 91.84%)',
  primary: '#4F46E5',
  black: '#1E293B',
  white: '#FFFFFF',
  red: '#F65063',
  alertRed: '#E54646',
  darkestGray: '#475569',
  darkGray: '#94A3B8',
  gray: '#CBD5E1',
  lightGray: '#E2E8F0',
  lightestGray: '#F1F5F9',
  bgGray: '#F8FAFC',
};

const fontSizes = {
  micro: '12px',
  small: '14px',
  base: '16px',
  medium: '18px',
  large: '20px',
};

const width = {
  max: '600px',
};

export type ColorsType = typeof colors;
export type FontSizeType = typeof fontSizes;
export type WidthType = typeof width;

interface Theme {
  colors: ColorsType;
  fontSizes: FontSizeType;
  width: WidthType;
}

const theme: Theme = {
  colors,
  fontSizes,
  width,
};

export default theme;
