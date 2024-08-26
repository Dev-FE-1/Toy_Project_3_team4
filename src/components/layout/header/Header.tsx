import { css, Theme } from '@emotion/react';
import { HiArrowLeft, HiOutlineXMark, HiOutlineCog6Tooth } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import logoSrc from '@/assets/images/logo.svg';
import IconButton from '@/utils/IconButton';

export const Logo = () => (
  <Link to="/">
    <img src={logoSrc} alt="Logo" />
  </Link>
);

export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton icon={<HiArrowLeft />} onClick={onClick} />
);

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton icon={<HiOutlineXMark />} onClick={onClick} />
);

export const SettingsButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton icon={<HiOutlineCog6Tooth />} onClick={onClick} />
);

export const Title = ({ text }: { text: string }) => <h1 css={titleStyle}>{text}</h1>;

export const SearchInput = ({ onChange }: { onChange: (value: string) => void }) => (
  <input
    type="text"
    placeholder="키워드 또는 닉네임 검색"
    onChange={(e) => onChange(e.target.value)}
    css={searchInputStyle}
  />
);

export const ActionButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button onClick={onClick} css={actionButtonStyle}>
    {text}
  </button>
);

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const searchInputStyle = (theme: Theme) => css`
  max-width: 510px;
  height: 36px;
  padding-left: 14px;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.black}
  &::placeholder {
    color: ${theme.colors.darkGray};
  }
`;

const actionButtonStyle = (theme: Theme) => css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  background: ${theme.colors.white};
  transition: 0.3s ease;
  &:hover {
    color: ${theme.colors.primary};
  }
`;
