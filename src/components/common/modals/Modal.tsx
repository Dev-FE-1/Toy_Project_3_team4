import { KeyboardEventHandler } from 'react';

import { css, keyframes } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import theme from '@/styles/theme';
interface ModalProps {
  isOpen: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
  fullScreen?: boolean;
  animated?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  animated = true,
  fullScreen = false,
  onClose,
}) => {
  const onEscapeKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay css={overlayStyle} onClick={onClose} />
        <div css={modalContainerStyle(animated, fullScreen)} onKeyDown={onEscapeKeyDown}>
          <Dialog.Content className="dialog__content">
            {title && <Dialog.Title className="dialog__title">{title}</Dialog.Title>}
            <VisuallyHidden>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{title}</Dialog.Description>
            </VisuallyHidden>
            <div className="dialog__body">{children}</div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const overlayStyle = css`
  z-index: 400;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100vw;
  max-width: ${theme.width.max};
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  animation: ${fadeIn} 0.2s ease-out;
`;

const modalContainerStyle = (animated: boolean, fullScreen?: boolean) => {
  const fullScreenStyle =
    fullScreen &&
    css`
      height: 100%;
    `;
  const borderRadius =
    fullScreen ||
    css`
      border-radius: 20px 20px 0 0;
    `;
  const animatedStyle =
    animated &&
    css`
      animation: ${slideUp} 0.3s ease-out;
    `;
  return css`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 500;
    max-width: ${theme.width.max};
    height: 100vh;
    pointer-events: none;

    .dialog__content {
      width: 100%;
      ${fullScreenStyle}
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      background-color: white;

      ${borderRadius}
      ${animatedStyle}
    pointer-events: auto;

      .dialog__title {
        width: 100%;
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
      }
    }
  `;
};

export default Modal;
