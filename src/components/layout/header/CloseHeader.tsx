import { css, SerializedStyles, useTheme, Theme } from '@emotion/react';
import { HiOutlineXMark } from 'react-icons/hi2';

import IconButton from '@/utils/IconButton';

import BaseHeader from './BaseHeader';

interface BackHeaderProps {
  title: string;
  onCloseClick: () => void;
  customStyle?: SerializedStyles;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, onCloseClick, customStyle }) => {
  const theme = useTheme();
  return (
    <BaseHeader
      leftSection={<IconButton icon={<HiOutlineXMark />} onClick={onCloseClick} />}
      centerSection={<h1 css={titleStyle(theme)}>{title}</h1>}
      customStyle={customStyle}
    />
  );
};

const titleStyle = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  color: ${theme.colors.black};
`;

export default BackHeader;
