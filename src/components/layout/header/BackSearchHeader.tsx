import BaseHeader from './base/BaseHeader';
import { BackButton, SearchInput } from './base/Header';

const BackSearchHeader = ({
  onBackClick,
  onSearchChange,
}: {
  onBackClick: () => void;
  onSearchChange: (value: string) => void;
}) => (
  <BaseHeader
    leftSection={<BackButton onClick={onBackClick} />}
    centerSection={<SearchInput onChange={onSearchChange} />}
  />
);

export default BackSearchHeader;
