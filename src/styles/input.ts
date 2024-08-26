import { css } from '@emotion/react';

import theme from '@/styles/theme';

export const commonInputContainerStyle = css`
  display: flex;
  width: 100%;

  .input-label {
    min-width: 60px;
    width: 15%;
    padding-top: 6px;
    font-size: ${theme.fontSizes.small};
    font-weight: 500;
    color: ${theme.colors.darkestGray};
  }

  .input-wrapper {
    flex: 1;
  }

  .error {
    padding-left: 8px;
  }

  input,
  textarea {
    &:focus {
      border-color: ${theme.colors.darkGray};
    }
  }
`;

export const errorMessageStyle = css`
  margin-top: 4px;
  color: ${theme.colors.alertRed};
  font-size: ${theme.fontSizes.micro};
`;

export const commonInputStyle = css`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
`;
