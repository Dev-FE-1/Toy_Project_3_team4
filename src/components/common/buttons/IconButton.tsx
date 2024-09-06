import { css, Theme } from '@emotion/react';

const IconButton: React.FC<{ icon: React.ReactNode; onClick: () => void }> = ({
  icon,
  onClick,
}) => (
  <button onClick={onClick} css={iconButtonStyle}>
    {icon}
  </button>
);

const iconButtonStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: 0.3s ease;
  height: 100%;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export default IconButton;
