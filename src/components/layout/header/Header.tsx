import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { HiArrowLeft, HiOutlineXMark, HiOutlineCog6Tooth } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import logoSrc from '@/assets/images/logo.svg';

interface HeaderProps {
  showLogo?: boolean;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showCompleteButton?: boolean;
  showSettingButton?: boolean;
  showSearchInput?: boolean;
  title?: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  onCompleteClick?: () => void;
  onSettingClick?: () => void;
  onSearchChange?: (value: string) => void;
  customStyle?: SerializedStyles;
}

const Header: React.FC<HeaderProps> = ({
  showLogo = false,
  showBackButton = false,
  showCloseButton = false,
  showCompleteButton = false,
  showSettingButton = false,
  showSearchInput = false,
  title,
  onBackClick,
  onCloseClick,
  onCompleteClick,
  onSettingClick,
  onSearchChange,
  customStyle,
}) => {
  const theme = useTheme();

  return (
    <header css={[baseHeaderStyle(theme), customStyle]}>
      <div css={leftSectionStyle}>
        {showBackButton && <HiArrowLeft onClick={onBackClick} css={iconStyle} />}
        {showCloseButton && <HiOutlineXMark onClick={onCloseClick} css={iconStyle} />}
        {showLogo && (
          <Link to="/">
            <img src={logoSrc} alt="Logo" />
          </Link>
        )}
        {title && <h1 css={titleStyle(theme)}>{title}</h1>}
      </div>
      {showSearchInput && (
        <input
          type="text"
          placeholder="키워드 또는 닉네임 검색"
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          css={searchInputStyle(theme)}
        />
      )}
      <div>
        {showCompleteButton && <button onClick={onCompleteClick} css={[completeBtnStyle(theme)]}>완료</button>}
        {showSettingButton && <HiOutlineCog6Tooth onClick={onSettingClick} css={iconStyle} />}
      </div>
    </header>
  );
};

const baseHeaderStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 60px;
  padding: 12px 16px;
  background-color: ${theme.colors.white};
`;

const leftSectionStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const searchInputStyle = (theme: Theme) => css`
  width: ${theme.width.max};
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

const completeBtnStyle = (theme: Theme) => css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  background: ${theme.colors.white};
  transition: .3s ease;
  &:hover {
    color: ${theme.colors.primary};
  }
`

const iconStyle = (theme: Theme) => css`
  font-size: 24px;
  cursor: pointer;
  transition: .3s ease;
  &:hover {
    color: ${theme.colors.primary};
  }
`

export default Header;
