import { css } from '@emotion/react';

import FullButton from '@/components/common/buttons/FullButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import Modal from '@/components/common/modals/Modal';

interface AddFixModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  isPublic: boolean;
  setIsPublic: (enabled: boolean) => void;
  isButtonEnabled: boolean;
  onSubmit: () => void;
}

const AddFixModal: React.FC<AddFixModalProps> = ({
  isOpen,
  onClose,
  title,
  inputValue,
  onInputChange,
  errorMessage,
  isPublic,
  setIsPublic,
  isButtonEnabled,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div css={modalContentContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          placeholder="플리 제목을 입력하세요"
        />
        {errorMessage && <p css={errorMessageStyles}>{errorMessage}</p>}
        <div className="toggleStyle">
          <span>전체 공개</span>
          <ToggleButton enabled={isPublic} setEnabled={setIsPublic} />
        </div>
        <FullButton styleType={isButtonEnabled ? 'primary' : 'disabled'} onClick={onSubmit}>
          추가하기
        </FullButton>
        <FullButton styleType="cancel" onClick={onClose}>
          취소하기
        </FullButton>
      </div>
    </Modal>
  );
};

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & .toggleStyle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
  }
`;

const errorMessageStyles = css`
  color: red;
  font-size: 12px;
`;

export default AddFixModal;
