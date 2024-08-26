import BaseHeader from './base/BaseHeader';
import { ActionButton, CloseButton, Title } from './base/Header';

const CloseTitleShareHeader = ({
  onCloseClick,
  title,
  onShareClick,
}: {
  onCloseClick: () => void;
  title: string;
  onShareClick: () => void;
}) => (
  <BaseHeader
    leftSection={<CloseButton onClick={onCloseClick} />}
    centerSection={<Title text={title} />}
    rightSection={<ActionButton text="공유하기" onClick={onShareClick} />}
  />
);

export default CloseTitleShareHeader;
