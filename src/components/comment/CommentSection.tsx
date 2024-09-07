import { css } from '@emotion/react';

import defaultProfile from '@/assets/images/default-avatar.svg';
import { useComments } from '@/hooks/useComments';
import { useMultipleUsersData } from '@/hooks/useMultipleUsersData';
import { useUserData } from '@/hooks/useUserData';

import { CommentInput } from './CommentInput';
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
    handleCompositionStart,
    handleCompositionEnd,
  } = useComments(postId || '');

  const userIds = Array.from(new Set(comments.map((comment) => comment.userId)));
  const { userData: currentUserData } = useUserData(currentUser?.uid || null);
  const { usersData } = useMultipleUsersData(userIds);

  return (
    <div css={commentSectionStyle}>
      <div css={commentContainerStyle}>
        <img src={currentUserData?.photoURL || ''} alt={currentUserData?.displayName || ''} />
        <CommentInput
          comment={newCommentContent}
          onChange={setNewCommentContent}
          onSubmit={handleCreateComment}
          handleCompositionStart={handleCompositionStart}
          handleCompositionEnd={handleCompositionEnd}
        />
      </div>
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
              handleCompositionStart={handleCompositionStart}
              handleCompositionEnd={handleCompositionEnd}
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

const commentContainerStyle = css`
  display: flex;
  gap: 8px;

  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
  }
`;

const commentsListStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export default CommentSection;
