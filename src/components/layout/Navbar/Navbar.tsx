import { css } from '@emotion/react';
import { CiSquarePlus } from 'react-icons/ci';
import {
  HiOutlineHome,
  HiMagnifyingGlass,
  HiOutlineRectangleStack,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import NavItem from '@/components/layout/Navbar/NavItem';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const Navbar = () => {
  return (
    <nav css={navStyle}>
      <ul className="nav-list">
        <NavItem Icon={HiOutlineHome} path={PATH.HOME} />
        <NavItem Icon={HiMagnifyingGlass} path={PATH.SEARCH} />
        <NavItem Icon={CiSquarePlus} path={PATH.ADD_POST} stroke={0.5} />
        <NavItem Icon={HiOutlineRectangleStack} path={PATH.PLAYLIST} />
        <NavItem Icon={HiOutlineUserCircle} path={PATH.PROFILE} />
      </ul>
    </nav>
  );
};

const navStyle = css`
  z-index: 100;
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100vw;
  height: 70px;
  border-top: 1px solid ${theme.colors.lightGray};
  background-color: ${theme.colors.white};
  transform: translateX(-50%);

  .nav-list {
    display: flex;
    flex-basis: 0;
    height: 100%;
  }
`;

export default Navbar;
