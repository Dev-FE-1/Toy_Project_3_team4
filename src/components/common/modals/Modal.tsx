import { useState, useEffect, KeyboardEventHandler } from 'react';

import { css, keyframes } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import theme from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

const ANIMATION_DURATION = 300;

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const onEscapeKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <Dialog.Root open={isOpen || isAnimating}>
      <Dialog.Portal>
        <div css={modalContainerStyle} onKeyDown={onEscapeKeyDown}>
          <Dialog.Content css={contentStyle(isOpen)} className="dialog-content">
            {title && (
              <Dialog.Title css={titleStyle} className="dialog-title">
                {title}
              </Dialog.Title>
            )}
            <VisuallyHidden>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{title}</Dialog.Description>
            </VisuallyHidden>
            <div className="dialog-body">{children}</div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

const modalContainerStyle = css`
  position: fixed;
  z-index: 300;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const contentStyle = (isOpen: boolean) => css`
  background-color: white;
  border-radius: 12px 12px 0 0;
  width: 100%;
  max-width: ${theme.width.max};
  animation: ${isOpen ? slideUp : slideDown} ${ANIMATION_DURATION}ms ease-out;
  animation-fill-mode: forwards;

  .dialog-body {
    width: 100%;
    padding: 0 16px 8px;
  }
`;

const titleStyle = css`
  display: flex;
  padding: 20px 0px;
  justify-content: center;
  align-items: center;
  font-weight: 500;

  color: ${theme.colors.black};
  border-bottom: 1px solid ${theme.colors.lightGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  line-height: 140%;
`;

export default Modal;
