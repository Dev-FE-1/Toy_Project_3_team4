import { css } from '@emotion/react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import logoSrc from '@/assets/images/logo.svg';
import IconButton from '@/components/common/buttons/IconButton';

import Header from './Header';

interface LogoHeaderProps {
  showSettings?: boolean;
  onSettingsClick?: () => void;
  customStyle?: React.CSSProperties;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ showSettings = false, onSettingsClick }) => {
  return (
    <Header
      leftSection={<Logo />}
      rightSection={showSettings && onSettingsClick && <SettingsButton onClick={onSettingsClick} />}
    />
  );
};

const Logo: React.FC = () => (
  <Link to="/" css={logoStyle}>
    <img src={logoSrc} alt="Logo" />
  </Link>
);

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => (
  <IconButton icon={<HiOutlineCog6Tooth />} onClick={onClick} />
);

const logoStyle = css`
  display: flex;
  align-items: center;
  img {
    height: 30px;
  }
`;

export default LogoHeader;
