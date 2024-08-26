import BaseHeader from './BaseHeader';
import { BackButton } from './Header';

const BackHeader = ({ onBackClick }: { onBackClick: () => void }) => (
  <BaseHeader leftSection={<BackButton onClick={onBackClick} />} />
);

export default BackHeader;
