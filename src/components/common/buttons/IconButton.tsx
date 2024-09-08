import { css } from '@emotion/react';

import theme from '@/styles/theme';

const IconButton: React.FC<{ icon: React.ReactNode; onClick: () => void; enabled?: boolean }> = ({
  icon,
  onClick,
  enabled = false,
}) => (
  <button
    onClick={onClick}
    css={[iconButtonStyle, enabled && enabledStyle]}
    data-testid="icon-button"
  >
    {icon}
  </button>
);

const iconButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: 0.3s ease;
  height: 100%;
`;

const enabledStyle = css`
  color: ${theme.colors.primary};
`;

export default IconButton;
