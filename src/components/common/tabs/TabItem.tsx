import { Theme, css, SerializedStyles } from '@emotion/react';

interface TabItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
  customStyle?: SerializedStyles;
}

const TabItem: React.FC<TabItemProps> = ({ id, label, icon, isActive, onClick, customStyle }) => (
  <button onClick={() => onClick(id)} css={[tabStyle, isActive && activeTabStyle, customStyle]}>
    <span css={iconStyle}>{icon}</span>
    {label}
  </button>
);

const tabStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: none;
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  color: ${theme.colors.darkestGray};
  transition: 0.3s ease;
  position: relative;
  z-index: 1;

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
    border-radius: 18px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
`;

const activeTabStyle = (theme: Theme) => css`
  color: ${theme.colors.black};
  &::before {
    opacity: 1;
    box-shadow: 0 4px 4px rgba(23, 23, 23, 0.06);
  }
`;

const iconStyle = css`
  width: 16px;
  margin-right: 8px;
`;

export default TabItem;
