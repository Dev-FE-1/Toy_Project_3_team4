import { useNavigate } from 'react-router-dom';
import BackSearchHeader from '@/components/layout/header/BackSearchHeader';

const SearchPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <BackSearchHeader onBackClick={handleBackClick} onSearchChange={console.log}/>
      <div>SearchPage</div>
    </>
  );
};

export default SearchPage;
