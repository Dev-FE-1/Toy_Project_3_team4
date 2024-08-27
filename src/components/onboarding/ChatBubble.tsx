import { css, SerializedStyles } from '@emotion/react';
import { IconType } from 'react-icons';

import GradientIcon from '@/components/common/GradientIcon';
import theme from '@/styles/theme';

interface ChatBubbleProps {
  Icon: IconType;
  contents: string;
  customStyle?: SerializedStyles;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ Icon, contents, customStyle = '' }) => {
  return (
    <div css={[chatBubbleStyle, customStyle]}>
      <GradientIcon Icon={Icon} />
      <p>{contents}</p>
    </div>
  );
};

const chatBubbleStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 100px;
  font-size: ${theme.fontSizes.micro};
  font-weight: 700;
  background-color: ${theme.colors.white};
  box-shadow:
    0px 4px 8px -2px rgba(23, 23, 23, 0.1),
    0px 2px 4px -2px rgba(23, 23, 23, 0.06);

  svg {
    stroke-width: 2;
  }

  ::before {
    z-index: 0;
    position: absolute;
    left: 50%;
    bottom: -8px;
    content: '';
    display: block;
    border: 5px solid ${theme.colors.white};
    transform: rotate(45deg) translateX(-50%);
    box-shadow:
      5px 1px 8px -2px rgba(23, 23, 23, 0.1),
      5px 3px 4px -2px rgba(23, 23, 23, 0.06);
  }
`;

export default ChatBubble;
