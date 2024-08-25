import Header from '@/components/layout/header/Header';

const SearchPage = () => {
  return (
    <>
      <Header
        showBackButton
        onBackClick={() => console.log('Go Back')}
        showSearchInput
        // onSearchChange={(value) => setSearchTerm(value)}
      />
      <div>SearchPage</div>
    </>
  );
};

export default SearchPage;
