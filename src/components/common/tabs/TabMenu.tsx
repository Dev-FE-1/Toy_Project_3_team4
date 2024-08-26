import { useState } from 'react';

import { SerializedStyles } from '@emotion/react';

import TabList, { TabItemData } from './TabList';

interface TabMenuProps {
  tabs: TabItemData[];
  onTabChange: (tabId: string) => void;
  defaultTabId?: string;
  customStyle?: SerializedStyles;
}

const TabMenu: React.FC<TabMenuProps> = ({ tabs, onTabChange, defaultTabId, customStyle }) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onTabChange(tabId);
  };

  return (
    <TabList
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
      customStyle={customStyle}
    />
  );
};

export default TabMenu;
