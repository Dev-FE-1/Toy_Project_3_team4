import { css } from '@emotion/react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import Header from '@/components/layout/header/Header';
import theme from '@/styles/theme';

interface BackHeaderProps {
  onBackClick?: () => void;
  onCloseClick?: () => void;
  title?: string;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
  rightButtonDisabled?: boolean;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  onBackClick,
  title,
  rightButtonText,
  onRightButtonClick,
  rightButtonDisabled = false,
}) => {
  const navigate = useNavigate();

  const onClick = () => onBackClick?.() || navigate(-1);

  return (
    <Header
      leftSection={<BackButton onClick={onClick} />}
      centerSection={title ? <Title text={title} /> : null}
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
      customStyle={headerStyle}
    />
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton icon={<HiArrowLeft />} onClick={onClick} />
);

const Title: React.FC<{ text: string }> = ({ text }) => <h1 css={titleStyle}>{text}</h1>;

const ActionButton: React.FC<{ text: string; onClick: () => void; disabled: boolean }> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <button onClick={onClick} css={actionButtonStyle(disabled)} disabled={disabled}>
      {text}
    </button>
  );
};

const headerStyle = css`
  position: fixed;
`;

const titleStyle = css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const actionButtonStyle = (disabled: boolean) => css`
  color: ${disabled ? theme.colors.darkGray : theme.colors.primary};
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  background: ${theme.colors.white};
  transition: 0.3s ease;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
`;

export default BackHeader;
