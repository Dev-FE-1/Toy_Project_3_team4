import { css, SerializedStyles } from '@emotion/react';

interface TabItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  customStyle?: SerializedStyles;
}

const TabItem: React.FC<TabItemProps> = ({ id, label, isActive, onClick, customStyle }) => (
  <button onClick={() => onClick(id)} css={[tabStyle, isActive && activeTabStyle, customStyle]}>
    {label}
  </button>
);

const tabStyle = css`
  padding: 8px 12px;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const activeTabStyle = css`
  color: #000;
  border-bottom: 2px solid #000;
`;

export default TabItem;
