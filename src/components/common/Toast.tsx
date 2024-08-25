import { useEffect, useState } from 'react';

import { css, Theme } from '@emotion/react';

interface ToastProps {
  message: string;
  isActive: boolean;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isActive, onClose }) => {
  const [visible, setVisible] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onClose]);

  return (
    <div css={(theme) => [baseToastStyle(theme), visible ? activeToastStyle : inactiveToastStyle]}>
      <p>{message}</p>
    </div>
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
  transition: all 0.7s ease-in-out;
  opacity: 0;
  z-index: 1000;
`;

const activeToastStyle = css`
  bottom: 20px;
  opacity: 1;
`;

const inactiveToastStyle = css`
  bottom: -20px;
  opacity: 0;
`;

export default Toast;
