import { Theme, css, SerializedStyles } from '@emotion/react';

interface TabItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
  customStyle?: SerializedStyles;
}

const TabItem: React.FC<TabItemProps> = ({ id, label, icon, isActive, onClick, customStyle }) => (
  <button onClick={() => onClick(id)} css={[tabStyle(isActive), customStyle]}>
    {icon && <span css={iconStyle(isActive)}>{icon}</span>} 
    {label}
  </button>
);

const tabStyle = (isActive: boolean) => (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: none;
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  color: ${isActive ? theme.colors.black : theme.colors.darkestGray};
  transition: 0.3s ease;
  position: relative;
  z-index: 0;

  &:hover {
    color: ${theme.colors.black};
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.white};
    border-radius: 30px;
    opacity: ${isActive ? 1 : 0};
    transition: opacity 0.3s ease;
    z-index: -1;
    ${isActive && `box-shadow: 0 4px 4px rgba(23, 23, 23, 0.06);`}
  }
`;

const iconStyle = (isActive: boolean) => (theme: Theme) => css`
  font-size: ${theme.fontSizes.base};
  margin-right: 4px;
  display: flex;
  right: 1px;
  top: 2px;

  ${isActive &&
  `
    background: ${theme.colors.primaryGradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: ${theme.colors.primary};
  `}

  svg {
    stroke-width: 2;
  }
`;

export default TabItem;
