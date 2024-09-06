import { css } from '@emotion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiDotsVertical, HiPencil, HiTrash } from 'react-icons/hi';

import defaultProfile from '@/assets/images/default-avatar.svg';
import FullButton from '@/components/common/buttons/FullButton';
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
}) => {
  return (
    <div css={commentStyle}>
      <img
        css={avatarStyle}
        src={userData?.photoURL || defaultProfile}
        alt={userData?.displayName}
      />
      <div css={commentContentStyle}>
        <div css={headerStyle}>
          <div css={userInfoStyle}>
            <span css={nameStyle}>{userData?.displayName || 'Unknown User'}</span>
            <span css={timeStyle}>{formatCreatedAt(comment.createdAt)}</span>
          </div>
          {comment.userId === currentUserId && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button css={menuTriggerStyle}>
                  <HiDotsVertical />
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
                  >
                    <HiPencil /> 댓글 수정
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    css={menuItemStyle}
                    onSelect={() => handleDeleteComment(comment.id)}
                  >
                    <HiTrash /> 댓글 삭제
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
        {editingCommentId === comment.id ? (
          <>
            <textarea
              css={editTextareaStyle}
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <div css={editButtonsStyle}>
              <FullButton
                styleType="primary"
                customStyle={smallerButtonStyle}
                onClick={() => handleUpdateComment(comment.id)}
              >
                저장
              </FullButton>
              <FullButton
                styleType="disabled"
                customStyle={smallerButtonStyle}
                onClick={() => setEditingCommentId(null)}
              >
                취소
              </FullButton>
            </div>
          </>
        ) : (
          <p css={commentTextStyle}>{comment.content}</p>
        )}
      </div>
    </div>
  );
};

const commentStyle = css`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  transform: translateX(5px);
`;

const avatarStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
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
  flex: 1;
`;

const nameStyle = css`
  font-weight: bold;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const timeStyle = css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.small};
  white-space: nowrap;
`;

const menuTriggerStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${theme.colors.darkGray};
  flex-shrink: 0;
  margin-left: 8px;
  &:hover {
    color: ${theme.colors.black};
  }
`;

const commentTextStyle = css`
  color: ${theme.colors.darkestGray};
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding-right: 24px;
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

const editTextareaStyle = css`
  width: 100%;
  padding: 8px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  resize: vertical;
  margin-bottom: 8px;
`;

const editButtonsStyle = css`
  display: flex;
  gap: 8px;
`;

const smallerButtonStyle = css`
  height: 25px;
  padding: 0 10px;
  font-size: ${theme.fontSizes.small};
  width: auto;
`;

export default CommentItem;
