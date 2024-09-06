import { css } from '@emotion/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

import theme from '@/styles/theme';

interface CommentInputProps {
  newCommentContent: string;
  setNewCommentContent: (content: string) => void;
  handleCreateComment: () => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  newCommentContent,
  setNewCommentContent,
  handleCreateComment,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateComment();
    }
  };

  return (
    <div css={newCommentStyle}>
      <textarea
        css={textareaStyle}
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 입력하세요..."
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

const textareaStyle = css`
  flex: 1;
  padding: 10px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  resize: none;
`;

const sendButtonStyle = css`
  background: ${theme.colors.primary};
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;
