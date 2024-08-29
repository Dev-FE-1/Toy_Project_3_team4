import { ReactNode } from 'react';

import { css, SerializedStyles, Theme } from '@emotion/react';

interface FitButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  styleType: 'primary' | 'secondary';
  customStyle?: SerializedStyles;
}

const FitButton: React.FC<FitButtonProps> = ({
  children,
  onClick,
  type = 'button',
  styleType,
  customStyle,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      css={(theme: Theme) => [
        baseButtonStyle(theme),
        buttonStyle(theme)[styleType],
        customStyle || [],
      ]}
    >
      {children}
    </button>
  );
};

const baseButtonStyle = (theme: Theme) => css`
  display: inline-flex;
  padding: 8px 14px;
  align-items: center;
  gap: 4px;
  border-radius: 50px;
  border: 0;
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  font-weight: normal;
  line-height: 100%;
  letter-spacing: -0.18px;
`;

const buttonStyle = (theme: Theme) => ({
  primary: css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  secondary: css`
    background-color: ${theme.colors.lightestGray};
    color: ${theme.colors.darkestGray};
  `,
});

export default FitButton;
