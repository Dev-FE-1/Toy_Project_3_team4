import { css } from '@emotion/react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

import theme from '@/styles/theme';

interface NavItemProps {
  Icon: IconType;
  path: string;
  stroke?: number;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, stroke, path }) => {
  return (
    <li css={itemStyle}>
      <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
        <Icon css={stroke && iconStyle(stroke)} />
      </NavLink>
    </li>
  );
};

const itemStyle = css`
  flex-grow: 1;
  font-size: 24px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    height: 100%;
    padding-top: 10px;
    color: ${theme.colors.darkGray};
    text-decoration: none;

    &.active {
      svg {
        color: ${theme.colors.primary};
      }
    }
  }
`;

const iconStyle = (stroke: number) => css`
  stroke-width: ${stroke};
`;

export default NavItem;
