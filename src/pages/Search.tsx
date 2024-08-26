import { useNavigate } from 'react-router-dom';

import BackHeader from '@/components/layout/header/BackHeader';
import { useState } from 'react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <BackHeader 
        onBackClick={handleBackClick}
        showSearch
        onSearchChange={handleSearchChange} />
      <div>SearchPage</div>
      {searchTerm && <p>현재 검색어: {searchTerm}</p>}
    </>
  );
};

export default SearchPage;
