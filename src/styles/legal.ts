import { css } from '@emotion/react';

import theme from '@/styles/theme';

export const legalPageStyle = css`
  padding-bottom: 24px;
  color: ${theme.colors.darkestGray};
  text-align: justify;

  h1 {
    padding-bottom: 12px;
    margin-bottom: 24px;
    border-bottom: 1px solid ${theme.colors.lightGray};
    font-size: ${theme.fontSizes.medium};
  }

  h2 {
    margin: 28px 0 16px;
  }

  p {
    margin-bottom: 16px;
    font-size: ${theme.fontSizes.small};
  }

  ul {
    margin-left: 24px;
    margin-bottom: 16px;
    font-size: ${theme.fontSizes.small};
    list-style-type: disc;
  }

  li {
    margin-bottom: 8px;
  }
`;
