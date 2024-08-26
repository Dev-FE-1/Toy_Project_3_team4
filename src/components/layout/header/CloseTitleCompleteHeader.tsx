import BaseHeader from './base/BaseHeader';
import { ActionButton, CloseButton, Title } from './base/Header';

const CloseTitleCompleteHeader = ({
  onCloseClick,
  title,
  onCompleteClick,
}: {
  onCloseClick: () => void;
  title: string;
  onCompleteClick: () => void;
}) => (
  <BaseHeader
    leftSection={<CloseButton onClick={onCloseClick} />}
    centerSection={<Title text={title} />}
    rightSection={<ActionButton text="완료" onClick={onCompleteClick} />}
  />
);

export default CloseTitleCompleteHeader;
