import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import FullButton from '@/components/common/buttons/FullButton';
import ToggleButton from '@/components/common/buttons/ToggleButton';
import Modal from '@/components/common/modals/Modal';
import theme from '@/styles/theme';

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
  isEditing?: boolean;
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
  isEditing = false,
}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered && !isOpen) return null;

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
        <div className="button-container">
          <FullButton styleType={isButtonEnabled ? 'primary' : 'disabled'} onClick={onSubmit}>
            {isEditing ? '수정하기' : '추가하기'}
          </FullButton>
          <FullButton styleType="cancel" onClick={onClose}>
            취소하기
          </FullButton>
        </div>
      </div>
    </Modal>
  );
};

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  margin: 24px 16px 32px;

  & .toggleStyle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
  }

  .button-container {
    width: 100%;

    button:first-child {
      margin-bottom: 8px;
    }
  }
`;

const errorMessageStyles = css`
  color: ${theme.colors.alertRed};
  font-size: 12px;
`;

export default AddFixModal;
