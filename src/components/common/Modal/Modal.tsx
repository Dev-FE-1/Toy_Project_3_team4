import { css, keyframes } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import theme from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  height?: string;
  animated?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  height = '30%',
  animated = true,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay css={overlayStyle(animated)} />
        <div css={modalContainerStyle}>
          <Dialog.Content css={contentStyle(height, animated)}>
            {title && <Dialog.Title css={titleStyle}>{title}</Dialog.Title>}
            <VisuallyHidden>
              <Dialog.Description>{title}</Dialog.Description>
            </VisuallyHidden>
            <div css={bodyStyle}>{children}</div>
            {footer && <div css={footerStyle}>{footer}</div>}
            <Dialog.Close css={closeButtonStyle} onClick={onClose}>
              &times;
            </Dialog.Close>
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

const overlayStyle = (animated: boolean) => css`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  ${animated &&
  css`
    animation: ${fadeIn} 0.2s ease-out;
  `}
`;

const modalContainerStyle = css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${theme.width.max};
  height: 100vh;
  pointer-events: none;
`;

const contentStyle = (height: string, animated: boolean) => css`
  background-color: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${height};
  display: flex;
  flex-direction: column;

  ${animated &&
  css`
    animation: ${slideUp} 0.3s ease-out;
  `}
  pointer-events: auto;

  @media screen and (min-width: ${theme.width.max}) {
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
  }
`;

const titleStyle = css`
  margin: 0;
  padding: 20px;
  font-weight: 500;
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.large};
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const bodyStyle = css`
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
`;

const footerStyle = css`
  padding: 15px 20px;
  border-top: 1px solid ${theme.colors.lightGray};
  display: flex;
  justify-content: flex-end;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: ${theme.fontSizes.large};
  cursor: pointer;
  color: ${theme.colors.gray};
  &:hover {
    color: ${theme.colors.black};
  }
`;

export default Modal;
