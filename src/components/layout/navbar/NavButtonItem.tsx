import { useState } from 'react';

import { css } from '@emotion/react';
import { IconType } from 'react-icons';
import { HiLink, HiOutlineRectangleStack } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

interface NavButtonItemProps {
  Icon: IconType;
  stroke?: number;
  onClick?: () => void;
}

const NavButtonItem: React.FC<NavButtonItemProps> = ({ Icon, stroke, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li>
      <button css={buttonStyle} type="button" onClick={onClick || handleOpenModal}>
        <Icon css={stroke ? iconStyle(stroke) : ''} />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="포스트 추가하기">
        <div css={modalContentContainer}>
          <div
            onClick={() => {
              handleCloseModal();
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
              handleCloseModal();
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

export default NavButtonItem;
