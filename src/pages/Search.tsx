import { useState } from 'react';

import { HiOutlinePencil, HiOutlineUser } from 'react-icons/hi2';

import { SearchType } from '@/api/algoliaSearch';
import TabContent from '@/components/common/tabs/TabContent';
import TabMenu from '@/components/common/tabs/TabMenu';
import SearchHeader from '@/components/layout/header/SearchHeader';
import { PostsTimeLine } from '@/components/post/PostsTimeline';
import UserInfo from '@/components/user/UserInfo';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { PostModel } from '@/types/post';
import { UserModel } from '@/types/user';

const tabs = [
  { id: 'post', label: '포스트', icon: <HiOutlinePencil /> },
  { id: 'user', label: '계정', icon: <HiOutlineUser /> },
];

const SearchPage = () => {
  const { value: searchTerm, debouncedValue: debouncedSearchTerm, onChange } = useDebounce();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { data: searchResults } = useSearch(activeTab as SearchType, debouncedSearchTerm);

  const isUserModel = (result: UserModel | PostModel): result is UserModel => {
    return 'displayName' in result;
  };

  return (
    <>
      <SearchHeader onChange={onChange} />
      {searchTerm && (
        <TabMenu activeTabId={activeTab} tabs={tabs} onTabChange={setActiveTab}>
          <TabContent id="post" activeTabId={activeTab}>
            {activeTab === 'post' && <PostsTimeLine posts={(searchResults as PostModel[]) || []} />}
          </TabContent>
          <TabContent id="user" activeTabId={activeTab}>
            {activeTab === 'user' &&
              searchResults
                ?.filter(isUserModel)
                .map((user) => (
                  <UserInfo key={user.userId} name={user.displayName} url={user.photoURL} />
                ))}
          </TabContent>
        </TabMenu>
      )}
    </>
  );
};

export default SearchPage;
