import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { HiOutlineXMark } from 'react-icons/hi2';

import IconButton from '@/components/common/buttons/IconButton';

import Header from './Header';

interface CloseHeaderProps {
  onCloseClick: () => void;
  title: string;
  rightButtonText?: string;
  onrightButtonClick?: () => void;
  customStyle?: SerializedStyles;
}

const CloseHeader: React.FC<CloseHeaderProps> = ({
  title,
  onCloseClick,
  rightButtonText,
  onrightButtonClick,
  customStyle,
}) => {
  return (
    <Header
      leftSection={<CloseButton onClick={onCloseClick} />}
      centerSection={title && <Title text={title} />}
      rightSection={
        rightButtonText &&
        onrightButtonClick && <ActionButton text={rightButtonText} onClick={onrightButtonClick} />
      }
      customStyle={customStyle}
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

const ActionButton: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => {
  const theme = useTheme();
  return (
    <button onClick={onClick} css={actionButtonStyle(theme)}>
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

const actionButtonStyle = (theme: Theme) => css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  background: ${theme.colors.white};
  transition: 0.3s ease;
  &:hover {
    color: ${theme.colors.primary};
  }
`;

export default CloseHeader;
