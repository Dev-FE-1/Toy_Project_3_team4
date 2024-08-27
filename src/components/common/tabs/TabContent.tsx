interface TabContentProps {
  id: string;
  activeTabId: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ id, activeTabId, children }) => {
  if (id !== activeTabId) return null;
  return <>{children}</>;
};

export default TabContent;
