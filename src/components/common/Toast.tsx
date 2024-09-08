import { useEffect, useState, useRef } from 'react';

import { css, Theme } from '@emotion/react';

import { useToastStore, type ToastModel } from '@/stores/toastStore';

const MAX_VISIBLE_TOASTS = 3;
const TOAST_SPACING = 56;
const TOAST_BOTTOM_OFFSET = 86;

const Toast: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const setToasts = useToastStore((state) => state.setToasts);
  const [visibleToasts, setVisibleToasts] = useState<ToastModel[]>([]);
  const transitionTimeoutRef = useRef<number | null>(null);

  const updateVisibleToasts = (newToasts: ToastModel[]) => {
    const updatedToasts = newToasts.map((toast) => ({
      ...toast,
      transitionToActive: true,
    }));

    setVisibleToasts(updatedToasts);

    if (JSON.stringify(updatedToasts) !== JSON.stringify(toasts)) {
      setToasts(updatedToasts);
    }
  };

  useEffect(() => {
    if (toasts.length >= 0) {
      const newToasts = toasts
        .slice(-MAX_VISIBLE_TOASTS)
        .map((toast: ToastModel, index: number) => ({
          ...toast,
          positionIndex: index,
        }));

      setVisibleToasts(newToasts);

      transitionTimeoutRef.current = window.setTimeout(() => {
        updateVisibleToasts(newToasts);
      }, 30);

      return () => {
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
      };
    }
  }, [toasts, setToasts]);

  const getToastStyle = (toast: ToastModel) => {
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
  width: calc(100% - 32px);
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.9);
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
    bottom 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  z-index: 1000;

  @media screen and (min-width: ${theme.width.max}) {
    width: calc(100% - 64px);
  }
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
