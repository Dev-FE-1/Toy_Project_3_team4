import { css, SerializedStyles, Theme } from '@emotion/react';

import TabItem from './TabItem';

export interface TabItemData {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabListProps {
  tabs: TabItemData[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  customStyle?: SerializedStyles;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeTabId, onTabChange, customStyle }) => (
  <div css={[tabListStyle, customStyle]}>
    {tabs.map((tab) => (
      <TabItem
        key={tab.id}
        id={tab.id}
        label={tab.label}
        icon={tab.icon}
        isActive={activeTabId === tab.id}
        onClick={onTabChange}
      />
    ))}
  </div>
);

const tabListStyle = (theme: Theme) => css`
  display: inline-flex;
  padding: 4px;
  margin-bottom: 20px;
  background: ${theme.colors.lightestGray};
  border-radius: 25px;
  position: relative;
`;

export default TabList;
