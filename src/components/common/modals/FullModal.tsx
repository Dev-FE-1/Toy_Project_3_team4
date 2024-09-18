import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import Modal from '@/components/common/modals/Modal';

interface FullModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  isFullModal?: boolean;
}

const FullModal: React.FC<FullModalProps> = ({ isOpen, onClose, onClick, children }) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={fullModalContainer} onClick={onClick}>
        {children}
      </div>
    </Modal>
  );
};

const fullModalContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 97vh;
  width: 100%;
  padding-top: 76px;
  background-color: white;
  overflow-y: auto;
  scrollbar-width: none;
`;

export default FullModal;
