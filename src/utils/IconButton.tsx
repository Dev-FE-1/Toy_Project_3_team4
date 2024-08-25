import { css, Theme } from '@emotion/react';

const IconButton: React.FC<{ icon: React.ReactNode; onClick: () => void }> = ({ icon, onClick }) => (
  <button onClick={onClick} css={iconButtonStyle}>
    {icon}
  </button>
);

const iconButtonStyle = (theme: Theme) => css`
  font-size: 24px;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    color: ${theme.colors.primary};
  }
`;

export default IconButton;