import BaseHeader from "./BaseHeader";
import { Logo } from "./Header";

const LogoHeader = () => (
  <BaseHeader leftSection={<Logo />} />
);

export default LogoHeader;