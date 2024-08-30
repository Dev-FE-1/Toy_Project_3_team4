import { css, SerializedStyles } from '@emotion/react';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import theme from '@/styles/theme';

import Header from './Header';

interface BackHeaderProps {
  onBackClick?: () => void;
  title?: string;
  customStyle?: SerializedStyles;
}

const BackHeader: React.FC<BackHeaderProps> = ({ onBackClick, title, customStyle }) => {
  const navigate = useNavigate();

  const onClick = () => onBackClick?.() || navigate(-1);

  return (
    <Header
      leftSection={<BackButton onClick={onClick} />}
      centerSection={title ? <Title text={title} /> : null}
      customStyle={customStyle}
    />
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton icon={<HiArrowLeft />} onClick={onClick} />
);

const Title: React.FC<{ text: string }> = ({ text }) => <h1 css={titleStyle}>{text}</h1>;

const titleStyle = css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

export default BackHeader;
