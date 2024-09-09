import { useState } from 'react';

import { css } from '@emotion/react';
import { IconType } from 'react-icons';
import { HiLink, HiOutlineRectangleStack } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import OptionModal from '@/components/common/modals/OptionModal';
import { PATH } from '@/constants/path';

interface NavButtonItemProps {
  Icon: IconType;
  stroke?: number;
  onClick?: () => void;
}

const NavButtonItem: React.FC<NavButtonItemProps> = ({ Icon, stroke, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const modalOptions = [
    {
      label: '링크로 동영상 추가',
      Icon: HiLink,
      onClick: () => {
        handleCloseModal();
        navigate(PATH.ADD_POST);
      },
    },
    {
      label: '플리에서 동영상 선택',
      Icon: HiOutlineRectangleStack,
      onClick: () => {
        handleCloseModal();
        navigate(PATH.SELECT_PLI, { state: { type: 'fromPli' } });
      },
    },
  ];

  return (
    <li>
      <button
        css={buttonStyle}
        type="button"
        onClick={onClick || handleOpenModal}
        data-testid="add-post-button"
      >
        <Icon css={stroke ? iconStyle(stroke) : ''} />
      </button>

      <OptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="포스트 추가하기"
        options={modalOptions}
      />
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
