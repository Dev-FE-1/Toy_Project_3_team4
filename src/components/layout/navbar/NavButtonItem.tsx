import { css } from '@emotion/react';
import { IconType } from 'react-icons';

interface NavButtonItemProps {
  Icon: IconType;
  stroke?: number;
  onClick: () => void;
}

const NavButtonItem: React.FC<NavButtonItemProps> = ({ Icon, stroke, onClick }) => {
  return (
    <li>
      <button css={buttonStyle} type="button" onClick={onClick}>
        <Icon css={stroke ? iconStyle(stroke) : ''} />
      </button>
    </li>
  );
};

const buttonStyle = css`
  width: 100%;
  background-color: transparent;
`;

const iconStyle = (stroke: number) => css`
  stroke-width: ${stroke};
`;

export default NavButtonItem;
