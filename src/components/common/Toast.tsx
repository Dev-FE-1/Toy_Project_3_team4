import { useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { useToast, type Toast } from '@/hooks/useToast';

const MAX_VISIBLE_TOASTS = 3;
const TOAST_SPACING = 56;
const TOAST_BOTTOM_OFFSET = 86;

const Toast: React.FC = () => {
  const { toasts } = useToast();
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    const newToasts = toasts.slice(-MAX_VISIBLE_TOASTS).map((toast, index) => ({
      ...toast,
      positionIndex: index,
    }));

    setVisibleToasts(newToasts);

    const activateTransition = setTimeout(() => {
      setVisibleToasts((prevToasts) =>
        prevToasts.map((toast) => ({ ...toast, transitionToActive: true })),
      );
    }, 30);

    return () => clearTimeout(activateTransition);
  }, [toasts]);

  const removeToast = () => {
    const lowestToast = visibleToasts[0];

    if (lowestToast && !lowestToast.show) {
      setVisibleToasts((prevToasts) => {
        const updatedToasts = prevToasts.slice(1);
        return updatedToasts.map((toast, index) => ({
          ...toast,
          positionIndex: index,
        }));
      });
    }
  };

  useEffect(() => {
    removeToast();
  }, [visibleToasts]);

  const getToastStyle = (toast: Toast) => {
    return toast.transitionToActive
      ? activeToastStyle(toast.positionIndex)
      : initialToastStyle(toast.positionIndex);
  };

  return (
    <>
      {visibleToasts.map((toast) => (
        <div key={toast.id} css={(theme: Theme) => [baseToastStyle(theme), getToastStyle(toast)]}>
          {toast.message}
        </div>
      ))}
    </>
  );
};

const baseToastStyle = (theme: Theme) => css`
  display: flex;
  width: 343px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  font-family: Pretendard;
  font-size: ${theme.fontSizes.base};
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.24px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  transition:
    bottom 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  z-index: 1000;
`;

const initialToastStyle = (index: number) => css`
  bottom: ${20 + index * TOAST_SPACING}px;
  opacity: 0;
`;

const activeToastStyle = (index: number) => css`
  bottom: ${TOAST_BOTTOM_OFFSET + index * TOAST_SPACING}px;
  opacity: 1;
`;

export default Toast;
