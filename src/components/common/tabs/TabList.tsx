import { css, SerializedStyles } from '@emotion/react';

import TabItem from './TabItem';

export interface TabItemData {
  id: string;
  label: string;
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
        isActive={activeTabId === tab.id}
        onClick={onTabChange}
      />
    ))}
  </div>
);

const tabListStyle = css`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

export default TabList;
