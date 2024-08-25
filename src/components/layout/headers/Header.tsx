import { Link } from 'react-router-dom';
import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';


interface HeaderProps {
  showLogo?: boolean;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showCompleteButton?: boolean;
  showSettingButton?: boolean;
  title?: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  onCompleteClick?: () => void;
  onSettingClick?: () => void;
  customStyle?: SerializedStyles;
}

const Header : React.FC<HeaderProps> = ({
  showLogo = false,
  showBackButton = false,
  showCloseButton = false,
  showCompleteButton = false,
  showSettingButton = false,
  title,
  onBackClick,
  onCloseClick,
  onCompleteClick,
  onSettingClick,
  customStyle,
}) => {
  const theme = useTheme();

  return (
    <header css={[baseHeaderStyle(theme), customStyle]}>
      <div css={leftSectionStyle}>
        {showBackButton && (
          <button onClick={onBackClick}>←</button>
        )}
        {showCloseButton && (
          <button onClick={onCloseClick}>x</button>
        )}
        {showLogo && (
          <Link to="/" css={logoStyle(theme)}><img src="@assets/images/logo.svg" alt="Logo" /></Link>
        )}
        {title && <h1 css={titleStyle(theme)}>{title}</h1>}
      </div>
      <div>
        {showCompleteButton && (
          <button onClick={onCompleteClick}>완료</button>
        )}
        {showSettingButton && (
          <button onClick={onSettingClick}>설정아이콘</button>
        )}
      </div>
    </header>
  )
}

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

export default Header;