import { css } from '@emotion/react';

import theme from '@/styles/theme';

interface ToggleButtonProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const ToggleButton = ({ enabled, setEnabled }: ToggleButtonProps) => {
  const onToggle = () => setEnabled(!enabled);

  return (
    <div
      css={switchContainerStyle}
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      tabIndex={0}
    >
      <div css={buttonStyle(enabled)}>
        <div css={buttonThumbStyle(enabled)} />
      </div>
    </div>
  );
};

const switchContainerStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const buttonStyle = (enabled: boolean) => css`
  display: flex;
  align-items: center;
  width: 44px;
  height: 24px;
  padding: 2px;
  border-radius: 12px;
  background-color: ${enabled ? theme.colors.primary : theme.colors.lightGray};
  transition: background-color 0.2s ease-in-out;
`;

const buttonThumbStyle = (enabled: boolean) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  transform: ${enabled ? 'translateX(20px)' : 'translateX(0)'};
  transition: transform 0.2s ease-in-out;
`;

export default ToggleButton;
