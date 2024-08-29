import { useEffect, useState } from 'react';

import { HiOutlinePencil, HiOutlineUser } from 'react-icons/hi2';

import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import SearchHeader from '@/components/layout/header/SearchHeader';
import { useDebounce } from '@/hooks/useDebounce';

const tabs = [
  { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
  { id: 'user', label: '계정', icon: <HiOutlineUser /> },
];

const SearchPage = () => {
  const { value: searchTerm, debouncedValue: debouncedSearchTerm, onChange } = useDebounce();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
      // 검색 로직
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <SearchHeader onChange={onChange} />
      {searchTerm && (
        <TabMenu activeTabId={activeTab} tabs={tabs} onTabChange={setActiveTab}>
          <TabContent id="post" activeTabId={activeTab}>
            <div>포스트</div>
          </TabContent>
          <TabContent id="user" activeTabId={activeTab}>
            <div>유저</div>
          </TabContent>
        </TabMenu>
      )}
      {searchTerm && <p>{searchTerm}</p>}
      {debouncedSearchTerm && <p>{debouncedSearchTerm}</p>}
    </>
  );
};

export default SearchPage;
