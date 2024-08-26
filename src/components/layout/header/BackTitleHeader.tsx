import BaseHeader from './base/BaseHeader';
import { BackButton, Title } from './base/Header';

const BackTitleHeader = ({ onBackClick, title }: { onBackClick: () => void; title: string }) => (
  <BaseHeader
    leftSection={<BackButton onClick={onBackClick} />}
    centerSection={<Title text={title} />}
  />
);

export default BackTitleHeader;
