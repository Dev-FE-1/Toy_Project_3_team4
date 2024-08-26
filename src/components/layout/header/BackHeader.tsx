import BaseHeader from './base/BaseHeader';
import { BackButton } from './base/Header';

const BackHeader = ({ onBackClick }: { onBackClick: () => void }) => (
  <BaseHeader leftSection={<BackButton onClick={onBackClick} />} />
);

export default BackHeader;
