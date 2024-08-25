import '@emotion/react';
import { ColorsType, FontSizeType, WidthType } from '@/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    fontSizes: FontSizeType;
    width: WidthType;
  }
}
