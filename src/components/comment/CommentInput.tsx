import { useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

import theme from '@/styles/theme';

const INPUT_MIN_HEIGHT = 44;
const INPUT_MAX_HEIGHT = INPUT_MIN_HEIGHT * 2;

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${INPUT_MIN_HEIGHT}px`;
      textarea.style.height = `${Math.min(textarea.scrollHeight, INPUT_MAX_HEIGHT)}px`;
    }
  }, [newCommentContent]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateComment();
    }
  };

  return (
    <div css={newCommentStyle}>
      <textarea
        ref={textareaRef}
        css={textareaStyle}
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="답글을 작성해주세요"
      />
      <button css={sendButtonStyle} onClick={handleCreateComment}>
        <HiOutlinePaperAirplane />
      </button>
    </div>
  );
};

const newCommentStyle = css`
  display: flex;
  align-items: flex-end;
  width: 100%;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 16px;
  background-color: ${theme.colors.bgGray};
`;

const textareaStyle = css`
  width: 100%;
  min-height: ${INPUT_MIN_HEIGHT}px;
  max-height: ${INPUT_MAX_HEIGHT}px;
  padding: 12px 0 8px 16px;
  font-size: ${theme.fontSizes.small};
  background-color: transparent;
  overflow-y: auto;

  @media screen and (min-width: ${theme.width.large}) {
    padding: 10px 0 8px 16px;
    font-size: ${theme.fontSizes.base};
  }
`;

const sendButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px 12px;
  border: none;
  border-radius: 4px;
  color: ${theme.colors.darkestGray};
  background-color: transparent;
  align-self: flex-end;
  cursor: pointer;

  svg {
    font-size: 20px;
    transform: rotate(-45deg);
  }

  @media screen and (min-width: ${theme.width.large}) {
    padding: 10px 8px 12px;
    font-size: ${theme.fontSizes.base};

    svg {
      font-size: 24px;
    }
  }
`;
