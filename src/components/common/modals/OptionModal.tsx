import { css } from '@emotion/react';

import Modal from '@/components/common/modals/Modal';

interface OptionModalPoops {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  options: {
    label: string;
    Icon: React.ComponentType;
    onClick: () => void;
  }[];
}

const OptionModal: React.FC<OptionModalPoops> = ({ isOpen, onClose, title, options }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div css={modalContentContainer}>
        {options.map((option, index) => (
          <div key={index} onClick={option.onClick}>
            <div className="icon-wrapper">
              <option.Icon />
            </div>
            {option.label}
          </div>
        ))}
      </div>
    </Modal>
  );
};

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
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
      background-color: #f1f3f5;
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

export default OptionModal;
