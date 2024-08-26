import BaseHeader from './BaseHeader';
import { BackButton, Title } from './Header';

const BackTitleHeader = ({ onBackClick, title }: { onBackClick: () => void; title: string }) => (
  <BaseHeader
    leftSection={<BackButton onClick={onBackClick} />}
    centerSection={<Title text={title} />}
  />
);

export default BackTitleHeader;
