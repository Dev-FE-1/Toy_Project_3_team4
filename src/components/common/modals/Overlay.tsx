import { css, keyframes } from '@emotion/react';

import { useModalStore } from '@/stores/modalStore';
import theme from '@/styles/theme';

const ANIMATION_DURATION = 300;

const Overlay: React.FC = () => {
  const isAnyModalOpen = useModalStore((state) => state.isAnyModalOpen());
  const closeAllModals = useModalStore((state) => state.closeAllModals);

  if (!isAnyModalOpen) return null;

  const handleOverlayClick = () => {
    closeAllModals();
  };

  return <div css={overlayStyle(isAnyModalOpen)} onClick={handleOverlayClick} />;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const overlayStyle = (isOpen: boolean) => css`
  z-index: 200;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100vw;
  max-width: ${theme.width.max};
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  animation: ${isOpen ? fadeIn : fadeOut} ${ANIMATION_DURATION}ms ease-out;
  animation-fill-mode: forwards;
  pointer-events: auto;
`;

export default Overlay;
