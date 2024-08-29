import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import { useDebounce } from '@/hooks/useDebounce';

const SearchPage = () => {
  const navigate = useNavigate();
  const { value: searchTerm, debouncedValue: debouncedSearchTerm, onChange } = useDebounce();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
      // 검색 로직
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <BackHeader onBackClick={handleBackClick} showSearch onSearchChange={onChange} />
      <div>SearchPage</div>
      {searchTerm && <p>{searchTerm}</p>}
      {debouncedSearchTerm && <p>{debouncedSearchTerm}</p>}
    </>
  );
};

export default SearchPage;
