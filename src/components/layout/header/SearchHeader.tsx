import { css } from '@emotion/react';

import Header from '@/components/layout/header/Header';
import theme from '@/styles/theme';

interface SearchHeaderProps {
  onChange?: (value: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onChange }) => {
  return <Header centerSection={<SearchInput onChange={onChange} />} customStyle={headerStyle} />;
};

const SearchInput: React.FC<SearchHeaderProps> = ({ onChange }) => (
  <input
    type="text"
    placeholder="키워드 또는 닉네임 검색"
    onChange={(event) => onChange && onChange(event.target.value)}
    css={searchInputStyle}
  />
);

const headerStyle = css`
  gap: 0;

  div {
    margin: 0;
  }
`;

const searchInputStyle = css`
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

export default SearchHeader;
