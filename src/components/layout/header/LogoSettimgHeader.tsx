import BaseHeader from './BaseHeader';
import { Logo, SettingsButton } from './Header';

const LogoSettingsHeader = ({ onSettingsClick }: { onSettingsClick: () => void }) => (
  <BaseHeader leftSection={<Logo />} rightSection={<SettingsButton onClick={onSettingsClick} />} />
);

export default LogoSettingsHeader;
