import { css, SerializedStyles, useTheme } from '@emotion/react';
import React, { ReactNode } from 'react';

interface FullButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color: 'primary' | 'lightestGray';
  customStyle?: SerializedStyles;
}

const FullButton: React.FC<FullButtonProps> = ({
  children,
  onClick,
  type = 'button',
  color,
  customStyle,
}) => {
  const theme = useTheme();
  return (
    <button
      type={type}
      onClick={onClick}
      css={[baseButtonStyle, buttonStyle(theme)[color], customStyle]}
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
  background: var(--primary);
  border: none;
  cursor: pointer;
`;

const buttonStyle = (theme: any) => ({
  primary: css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  lightestGray: css`
    background-color: ${theme.colors.lightestGray};
    color: ${theme.colors.darkestGray};
  `,
});

export default FullButton;
