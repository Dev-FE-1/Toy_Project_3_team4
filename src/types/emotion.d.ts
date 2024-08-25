import '@emotion/react';
import { ColorsType, FontSizeType } from '@/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    fontSizes: FontSizeType;
  }
}
