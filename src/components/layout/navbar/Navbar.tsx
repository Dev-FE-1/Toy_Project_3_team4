import { useState } from 'react';

import { css } from '@emotion/react';
import { CiSquarePlus } from 'react-icons/ci';
import {
  HiOutlineHome,
  HiMagnifyingGlass,
  HiOutlineRectangleStack,
  HiOutlineUserCircle,
  HiLink,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import NavButtonItem from '@/components/layout/navbar/NavButtonItem';
import NavItem from '@/components/layout/navbar/NavItem';
import { PATH } from '@/constants/path';
import { maxWidthStyle } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const onClose = () => setIsModalOpen(false);
  return (
    <nav css={[navStyle, maxWidthStyle(false)]}>
      <ul className="nav-list">
        <NavItem Icon={HiOutlineHome} path={PATH.HOME} />
        <NavItem Icon={HiMagnifyingGlass} path={PATH.SEARCH} />
        <NavButtonItem Icon={CiSquarePlus} onClick={() => setIsModalOpen(true)} />
        <NavItem Icon={HiOutlineRectangleStack} path={PATH.PLAYLIST} />
        <NavItem Icon={HiOutlineUserCircle} path={PATH.PROFILE} />
      </ul>
      <Modal isOpen={isModalOpen} onClose={onClose} title="포스트 추가하기">
        <div css={modalContentContainer}>
          <div
            onClick={() => {
              onClose();
              navigate(PATH.ADD_POST);
            }}
          >
            <div className="icon-wrapper">
              <HiLink />
            </div>
            링크로 동영상 추가
          </div>
          <div
            onClick={() => {
              onClose();
              navigate(PATH.SELECT_PLI);
            }}
          >
            <div className="icon-wrapper">
              <HiOutlineRectangleStack />
            </div>
            플리에서 동영상 선택
          </div>
        </div>
      </Modal>
    </nav>
  );
};

const modalContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  width: 343px;
  margin: 24px 16px 32px;

  & > div {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    width: 100%;

    .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: ${theme.colors.lightestGray};
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;

      svg {
        height: 18px;
        width: 18px;
      }
    }
  }
`;

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
