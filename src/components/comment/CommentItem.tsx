import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiDotsVertical, HiPencil, HiTrash } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import { CommentInput } from '@/components/comment/CommentInput';
import Avatar from '@/components/common/Avatar';
import FitButton from '@/components/common/buttons/FitButton';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { CommentModel } from '@/types/comment';
import { formatCreatedAt } from '@/utils/date';
interface CommentItemProps {
  comment: CommentModel;
  currentUserId: string | undefined;
  editingCommentId: string | null;
  editingContent: string;
  setEditingCommentId: (id: string | null) => void;
  setEditingContent: (content: string) => void;
  handleUpdateComment: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  userData: { displayName: string; photoURL: string };
  handleCompositionStart: () => void;
  handleCompositionEnd: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUserId,
  editingCommentId,
  editingContent,
  setEditingCommentId,
  setEditingContent,
  handleUpdateComment,
  handleDeleteComment,
  userData,
  handleCompositionStart,
  handleCompositionEnd,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const onDeleteClick = () => {
    setIsDeleting(true);
    if (commentRef.current) {
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
      commentRef.current.style.transition = 'all 0.5s ease-out';
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.style.height = '0px';
          commentRef.current.style.opacity = '0';
          commentRef.current.style.padding = '0';
          commentRef.current.style.margin = '0';
        }
      }, 0);
    }
    setTimeout(() => {
      handleDeleteComment(comment.id);
    }, 500);
  };

  return (
    <div css={[commentStyle, isDeleting && deletingStyle]}>
      <Avatar url={userData?.photoURL} size="medium" customStyle={avatarStyle} />
      <div css={commentContentStyle}>
        <div css={headerStyle}>
          <div css={userInfoStyle}>
            <Link to={PATH.PROFILE.replace(':userId', comment.userId)}>
              <span css={nameStyle}>{userData?.displayName || 'Unknown User'}</span>
            </Link>
            <span css={timeStyle}>{formatCreatedAt(comment.createdAt)}</span>
          </div>
          {comment.userId === currentUserId && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button css={menuTriggerStyle} data-testid="comment-dropdown-button">
                  <HiDotsVertical size={18} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content css={menuContentStyle}>
                  <DropdownMenu.Item
                    css={menuItemStyle}
                    onSelect={() => {
                      setEditingCommentId(comment.id);
                      setEditingContent(comment.content);
                    }}
                    data-testid="edit-comment-button"
                  >
                    <HiPencil /> 댓글 수정
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    css={menuItemStyle}
                    onSelect={() => handleDeleteComment(comment.id)}
                    data-testid="delete-comment-button"
                    onClick={onDeleteClick}
                  >
                    <HiTrash /> 댓글 삭제
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
        {editingCommentId === comment.id ? (
          <div css={editCommentContainerStyle}>
            <CommentInput
              comment={editingContent}
              onChange={setEditingContent}
              onSubmit={() => handleUpdateComment(comment.id)}
              customStyle={editInputStyle}
              handleCompositionStart={handleCompositionStart}
              handleCompositionEnd={handleCompositionEnd}
            />
            <FitButton
              styleType="secondary"
              onClick={() => setEditingCommentId(null)}
              customStyle={cancelButtonStyle}
            >
              <HiXMark size={20} />
            </FitButton>
          </div>
        ) : (
          <p css={commentTextStyle} data-testid="comment-content">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};

const commentStyle = css`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  transform: translateX(4px);
`;

const avatarStyle = css`
  margin-right: 8px;
`;

const deletingStyle = css`
  transition: all 0.5s ease-out;
  overflow: hidden;
`;

const commentContentStyle = css`
  flex-grow: 1;
  min-width: 0;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const userInfoStyle = css`
  display: flex;
  align-items: center;
  min-width: 0;
  margin-top: 2px;
  flex: 1;
`;

const nameStyle = css`
  color: ${theme.colors.darkestGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  margin-right: 8px;
  white-space: nowrap;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const timeStyle = css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.micro};
  white-space: nowrap;
  line-height: 100%;
`;

const menuTriggerStyle = css`
  flex-shrink: 0;
  height: 18px;
  margin-left: 8px;
  border: none;
  color: ${theme.colors.darkGray};
  background: none;
  cursor: pointer;
`;

const commentTextStyle = css`
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding-right: 32px;
  text-align: justify;
  font-size: ${theme.fontSizes.small};
`;

const editCommentContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const editInputStyle = css`
  background-color: ${theme.colors.white};
`;

const menuContentStyle = css`
  min-width: 120px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const menuItemStyle = css`
  all: unset;
  font-size: 13px;
  line-height: 1;
  color: ${theme.colors.black};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;

  &:hover {
    background-color: ${theme.colors.lightGray};
  }

  svg {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const cancelButtonStyle = css`
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid ${theme.colors.lightGray};
  background-color: ${theme.colors.bgGray};
  cursor: pointer;

  svg {
    stroke-width: 0.2;
  }
`;

export default CommentItem;
