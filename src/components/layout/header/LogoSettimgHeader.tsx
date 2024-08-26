import BaseHeader from './base/BaseHeader';
import { Logo, SettingsButton } from './base/Header';

const LogoSettingsHeader = ({ onSettingsClick }: { onSettingsClick: () => void }) => (
  <BaseHeader leftSection={<Logo />} rightSection={<SettingsButton onClick={onSettingsClick} />} />
);

export default LogoSettingsHeader;
