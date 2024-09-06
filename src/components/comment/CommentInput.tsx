import { css } from '@emotion/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface CommentInputProps {
  newCommentContent: string;
  setNewCommentContent: (content: string) => void;
  handleCreateComment: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  newCommentContent,
  setNewCommentContent,
  handleCreateComment,
}) => {
  return (
    <div css={newCommentStyle}>
      <textarea
        css={textareaStyle}
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <button css={sendButtonStyle} onClick={handleCreateComment}>
        <HiOutlinePaperAirplane />
      </button>
    </div>
  );
};

const newCommentStyle = css`
  display: flex;
  margin-bottom: 20px;
`;

const textareaStyle = () => css`
  width: 100%;
  padding: 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.small};
  resize: vertical;
`;

const sendButtonStyle = () => css`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.black};
  }
`;

export default CommentInput;
