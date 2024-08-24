import { css, SerializedStyles, useTheme } from '@emotion/react';
import React, { ReactNode } from 'react';

interface LongButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color: 'primary' | 'lightestGray' | 'gray' | 'white';
  customStyle?: SerializedStyles;
}

const LongButton: React.FC<LongButtonProps> = ({
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
  display: flex;
  width: 100%;
  height: 50px;
  padding: 3px 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
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
  gray: css`
    background-color: ${theme.colors.gray};
    color: ${theme.colors.white};
  `,
  white: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGray};
  `,
});

export default LongButton;
