import '@emotion/react';
import { ColorsType, FontSizeType } from '@/styles/Theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    fontSizes: FontSizeType;
  }
}
