import { css } from '@emotion/react';

import Modal from '@/components/common/Modal';
import theme from '@/styles/theme';

interface AddPlaylistModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({ isModalOpen, onClose }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="포스트 추가하기">
      <div css={modalContentContainer}>
        <div
          onClick={() => {
            onClose();
          }}
        >
          <div className="icon-wrapper"></div>
          링크로 동영상 추가
        </div>
        <div>
          <div className="icon-wrapper"></div>
          플리에서 동영상 선택
        </div>
      </div>
      //{' '}
    </Modal>
  );
};

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;

    .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: ${theme.colors.lightestGray};
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;

      svg {
        height: 18px;
        width: 18px;
      }
    }
  }
`;

export default AddPlaylistModal;
