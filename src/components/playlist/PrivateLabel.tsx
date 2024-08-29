import { css, SerializedStyles } from '@emotion/react';
import { HiOutlineLockClosed } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface PrivateLabelProps {
  customStyle?: SerializedStyles;
}

const PrivateLabel: React.FC<PrivateLabelProps> = ({ customStyle }) => {
  return (
    <div css={[labelStyle, customStyle]}>
      <HiOutlineLockClosed />
    </div>
  );
};

const labelStyle = css`
  position: absolute;
  top: 6%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 0;
  padding-bottom: 15%;
  border-radius: 50%;
  background: rgba(30, 41, 59, 0.7);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    color: ${theme.colors.white};
  }
`;

export default PrivateLabel;
