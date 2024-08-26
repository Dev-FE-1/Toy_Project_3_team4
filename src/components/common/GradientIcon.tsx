import { css } from '@emotion/react';
import { IconType } from 'react-icons';

import { calculateGradientCoordinates } from '@/utils/gradient';

interface GradientIconProps {
  Icon: IconType;
  size?: number | string;
  angle?: number;
}

const GradientIcon: React.FC<GradientIconProps> = ({ Icon, size = 12, angle = 62 }) => {
  const { x1, y1, x2, y2 } = calculateGradientCoordinates(angle);

  return (
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="iconGradient" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="8.16%" stopColor="#8E2DE2" />
          <stop offset="91.84%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <Icon css={iconStyle} />
    </svg>
  );
};

const iconStyle = css`
  stroke: url(#iconGradient);
`;

export default GradientIcon;
