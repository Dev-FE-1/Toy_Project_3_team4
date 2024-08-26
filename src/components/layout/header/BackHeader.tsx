import { css, Theme } from '@emotion/react';
import { HiArrowLeft } from 'react-icons/hi2';
import BaseHeader from './BaseHeader';
import IconButton from '@/components/common/buttons/IconButton';

interface BackHeaderProps {
  onBackClick: () => void;
  title?: string;
  showSearch?: boolean;
  onSearchChange?: (value: string) => void;
  customStyle?: React.CSSProperties;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  onBackClick,
  title,
  showSearch = false,
  onSearchChange,
  // customStyle,
}) => {
  return (
    <BaseHeader 
      leftSection={<BackButton onClick={onBackClick} />}
      centerSection={
        showSearch ? (
          <SearchInput onChange={onSearchChange} />
        ) : title ? (
          <Title text={title} />
        ) : null
      }
      
    />
  )
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton icon={<HiArrowLeft />} onClick={onClick} />
);

const Title: React.FC<{ text: string }> = ({ text }) => (
  <h1 css={titleStyle}>{text}</h1>
);

interface SearchInputProps {
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => (
  <input
    type="text"
    placeholder="키워드 또는 닉네임 검색"
    onChange={(e) => onChange && onChange(e.target.value)}
    css={searchInputStyle}
  />
);

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const searchInputStyle = (theme: Theme) => css`
  width: 100%;
  height: 36px;
  padding-left: 14px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.black};
  &::placeholder {
    color: ${theme.colors.darkGray};
  }
`;

export default BackHeader;
