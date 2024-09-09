import { ReactNode } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { IconType } from 'react-icons';

import theme from '@/styles/theme';

interface EmptyMessageProps {
  Icon: IconType;
  children: ReactNode;
  customStyle?: SerializedStyles;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ Icon, customStyle, children }) => {
  return (
    <div css={[emptyMessageStyle, customStyle]}>
      <Icon />
      <p>{children}</p>
    </div>
  );
};

const emptyMessageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 60px 0;
  color: ${theme.colors.darkestGray};
  font-size: 32px;

  p {
    font-size: ${theme.fontSizes.small};
  }
`;

export default EmptyMessage;
