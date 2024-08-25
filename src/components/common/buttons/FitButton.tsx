import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import React, { ReactNode } from 'react';

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
  const theme = useTheme();
  return (
    <button
      type={type}
      onClick={onClick}
      css={[baseButtonStyle, buttonStyle(theme)[styleType], customStyle]}
    >
      {children}
    </button>
  );
};

const baseButtonStyle = css`
  display: inline-flex;
  padding: 6px 14px;
  align-items: center;
  gap: 4px;
  border-radius: 50px;
  border: 0;
  cursor: pointer;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
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
