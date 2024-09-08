import { useEffect, useRef } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

import theme from '@/styles/theme';

const INPUT_MIN_HEIGHT = 40;
const INPUT_MAX_HEIGHT = INPUT_MIN_HEIGHT * 2;

interface CommentInputProps {
  comment: string;
  onChange: (comment: string) => void;
  onSubmit: () => void;
  customStyle?: SerializedStyles;
  handleCompositionStart: () => void;
  handleCompositionEnd: () => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  comment,
  onChange,
  onSubmit,
  customStyle,
  handleCompositionStart,
  handleCompositionEnd,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${INPUT_MIN_HEIGHT}px`;
      textarea.style.height = `${Math.min(textarea.scrollHeight, INPUT_MAX_HEIGHT)}px`;
    }
  }, [comment]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div css={[newCommentStyle, customStyle]}>
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 작성해주세요"
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        data-testid="comment-input"
      />
      <button onClick={onSubmit}>
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
  border-radius: 12px;
  background-color: ${theme.colors.bgGray};

  textarea {
    width: 100%;
    min-height: ${INPUT_MIN_HEIGHT}px;
    max-height: ${INPUT_MAX_HEIGHT}px;
    padding: 10px 0 8px 16px;
    font-size: ${theme.fontSizes.small};
    background-color: transparent;
    overflow-y: auto;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 10px 12px;
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
  }
`;
