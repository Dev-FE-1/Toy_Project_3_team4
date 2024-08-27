import { ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import TabList, { TabItemData } from './TabList';

interface TabMenuProps {
  tabs: TabItemData[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  customStyle?: SerializedStyles;
  children: ReactNode;
}

const TabMenu: React.FC<TabMenuProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  customStyle,
  children,
}) => {
  return (
    <>
      <TabList
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={onTabChange}
        customStyle={customStyle}
      />
      {children}
    </>
  );
};

export default TabMenu;
