import { Link } from 'react-router-dom';
import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';

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
        {showBackButton && <button onClick={onBackClick}>←</button>}
        {showCloseButton && <button onClick={onCloseClick}>x</button>}
        {showLogo && (
          <Link to="/" css={logoStyle(theme)}>
            <img src="@assets/images/logo.svg" alt="Logo" />
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
        {showCompleteButton && <button onClick={onCompleteClick}>완료</button>}
        {showSettingButton && <button onClick={onSettingClick}>설정아이콘</button>}
      </div>
    </header>
  );
};

const baseHeaderStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${theme.colors.white};
`;

const leftSectionStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const logoStyle = (theme: Theme) => css`
  text-decoration: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.large};
  font-weight: bold;
`;

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.black};
`;

const searchInputStyle = (theme: Theme) => css`
  padding: 0.5rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
`;

export default Header;
