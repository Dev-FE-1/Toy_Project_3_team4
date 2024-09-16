import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { HiOutlineXMark } from 'react-icons/hi2';

import IconButton from '@/components/common/buttons/IconButton';
import Header from '@/components/layout/header/Header';

interface CloseHeaderProps {
  onCloseClick: () => void;
  title: string;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
  customStyle?: SerializedStyles;
  rightButtonDisabled?: boolean;
  usePortal?: boolean;
}

const CloseHeader: React.FC<CloseHeaderProps> = ({
  title,
  onCloseClick,
  rightButtonText,
  onRightButtonClick,
  customStyle,
  rightButtonDisabled = false,
  usePortal = true,
}) => {
  return (
    <Header
      leftSection={<CloseButton onClick={onCloseClick} />}
      centerSection={title && <Title text={title} />}
      rightSection={
        rightButtonText &&
        onRightButtonClick && (
          <ActionButton
            text={rightButtonText}
            onClick={onRightButtonClick}
            disabled={rightButtonDisabled}
          />
        )
      }
      customStyle={customStyle}
      usePortal={usePortal}
    />
  );
};

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton icon={<HiOutlineXMark />} onClick={onClick} />
);

const Title: React.FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();
  return <h1 css={titleStyle(theme)}>{text}</h1>;
};

const ActionButton: React.FC<{ text: string; onClick: () => void; disabled: boolean }> = ({
  text,
  onClick,
  disabled,
}) => {
  const theme = useTheme();
  return (
    <button onClick={onClick} css={actionButtonStyle(theme, disabled)} disabled={disabled}>
      {text}
    </button>
  );
};

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const actionButtonStyle = (theme: Theme, disabled: boolean) => css`
  color: ${disabled ? theme.colors.darkGray : theme.colors.primary};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  background: ${theme.colors.white};
  transition: 0.3s ease;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
`;

export default CloseHeader;
