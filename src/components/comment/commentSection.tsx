import { css } from '@emotion/react';

import defaultProfile from '@/assets/images/default-avatar.svg';
import { useComments } from '@/hooks/useComments';
import { useMultipleUsersData } from '@/hooks/useMultipleUsersData';

import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const {
    currentUser,
    comments,
    newCommentContent,
    setNewCommentContent,
    editingCommentId,
    setEditingCommentId,
    editingContent,
    setEditingContent,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
  } = useComments(postId || '');

  const userIds = Array.from(new Set(comments.map((comment) => comment.userId)));
  const { usersData } = useMultipleUsersData(userIds);

  return (
    <div css={commentSectionStyle}>
      <CommentInput
        newCommentContent={newCommentContent}
        setNewCommentContent={setNewCommentContent}
        handleCreateComment={handleCreateComment}
      />
      <div css={commentsListStyle}>
        {comments.map((comment) => {
          const userData = usersData[comment.userId];
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUser?.uid}
              editingCommentId={editingCommentId}
              editingContent={editingContent}
              setEditingCommentId={setEditingCommentId}
              setEditingContent={setEditingContent}
              handleUpdateComment={handleUpdateComment}
              handleDeleteComment={handleDeleteComment}
              userData={userData || { displayName: '익명', photoURL: defaultProfile }}
            />
          );
        })}
      </div>
    </div>
  );
};

const commentSectionStyle = css`
  margin-top: 20px;
`;

const commentsListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export default CommentSection;
