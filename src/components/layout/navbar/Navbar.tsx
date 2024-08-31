import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { CiSquarePlus } from 'react-icons/ci';
import {
  HiOutlineHome,
  HiMagnifyingGlass,
  HiOutlineRectangleStack,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import NavButtonItem from '@/components/layout/navbar/NavButtonItem';
import NavItem from '@/components/layout/navbar/NavItem';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import { maxWidthStyle } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';

const Navbar = () => {
  const currentUser = useAuth();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <nav css={[navStyle, maxWidthStyle(false)]}>
      <ul className="nav-list">
        <NavItem Icon={HiOutlineHome} path={PATH.HOME} />
        <NavItem Icon={HiMagnifyingGlass} path={PATH.SEARCH} />
        <NavButtonItem Icon={CiSquarePlus} onClick={() => {}} stroke={0.5} />
        <NavItem Icon={HiOutlineRectangleStack} path={PATH.PLAYLIST} />
        <NavItem Icon={HiOutlineUserCircle} path={PATH.PROFILE} userId={userId || ''} />
      </ul>
    </nav>
  );
};

const navStyle = css`
  height: 70px;

  @media screen and (min-width: ${theme.width.max}) {
    border: 1px solid ${theme.colors.lightGray};
    border-bottom: 0;
  }

  .nav-list {
    display: flex;
    flex-basis: 0;
    height: 100%;

    li {
      flex-grow: 1;
      font-size: 24px;

      a,
      button {
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
    }
  }
`;

export default Navbar;
