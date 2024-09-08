import { ReactNode } from 'react';

import { css, SerializedStyles, Theme } from '@emotion/react';

interface FullButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  styleType: 'primary' | 'disabled' | 'signin' | 'cancel';
  customStyle?: SerializedStyles;
}

const FullButton: React.FC<FullButtonProps> = ({
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
      disabled={styleType === 'disabled'}
    >
      {children}
    </button>
  );
};

const baseButtonStyle = (theme: Theme) => css`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 3px 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 0;
  align-self: stretch;
  border-radius: 8px;
  font-size: ${theme.fontSizes.base};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;
`;

const buttonStyle = (theme: Theme) => ({
  primary: css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `,
  disabled: css`
    background-color: ${theme.colors.lightestGray};
    color: ${theme.colors.darkestGray};
  `,
  signin: css`
    background-color: ${theme.colors.lightestGray};
    color: ${theme.colors.black};
  `,
  cancel: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGray};
  `,
});

export default FullButton;
