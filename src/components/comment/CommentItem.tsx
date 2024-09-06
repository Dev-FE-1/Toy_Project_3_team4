// CommentItem.tsx
import { css } from '@emotion/react';

import { CommentModel } from '@/api/fetchComment';
import defaultProfile from '@/assets/images/default-avatar.svg';
import theme from '@/styles/theme';
import { formatCreatedAt } from '@/utils/date';

import CommentActions from './CommentActions';
import UserInfo from '../user/UserInfo';

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
      <UserInfo
        name={userData?.displayName || 'Unknown User'}
        url={userData?.photoURL || defaultProfile}
        userId={comment.userId}
      />
      <div css={commentContentStyle}>
        {editingCommentId === comment.id ? (
          <>
            <textarea
              css={editTextareaStyle}
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <div css={editButtonsStyle}>
              <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p>{comment.content}</p>
            <span css={commentDateStyle}>{formatCreatedAt(comment.createdAt)}</span>
            {comment.userId === currentUserId && (
              <CommentActions
                onEdit={() => {
                  setEditingCommentId(comment.id);
                  setEditingContent(comment.content);
                }}
                onDelete={() => handleDeleteComment(comment.id)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const commentStyle = css`
  display: flex;
  align-items: flex-start;
`;

const commentContentStyle = () => css`
  margin-left: 12px;
  flex-grow: 1;
  font-size: ${theme.fontSizes.small};
`;

const commentDateStyle = () => css`
  font-size: ${theme.fontSizes.micro};
  color: ${theme.colors.darkGray};
  margin-top: 4px;
  display: block;
`;

const editTextareaStyle = () => css`
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

export default CommentItem;
