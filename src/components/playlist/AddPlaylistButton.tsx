import { css, SerializedStyles } from '@emotion/react';
import { HiOutlinePlus } from 'react-icons/hi';

import theme from '@/styles/theme';

interface AddPlaylistButtonProps {
  customStyle?: SerializedStyles;
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({ customStyle }) => {
  const onClick = () => {
    // pli 추가 modal open
  };

  return (
    <div css={[buttonContainerStyle, customStyle]}>
      <button id="add" onClick={onClick}>
        <HiOutlinePlus />
      </button>
      <label htmlFor="add">새로운 플리 추가</label>
    </div>
  );
};

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    color: ${theme.colors.darkestGray};
    background-color: ${theme.colors.lightGray};
  }

  label {
    color: ${theme.colors.darkestGray};
    font-weight: 700;
  }
`;

export default AddPlaylistButton;
