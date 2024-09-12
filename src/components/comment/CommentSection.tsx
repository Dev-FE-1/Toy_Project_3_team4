import { useMemo } from 'react';

import { css } from '@emotion/react';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';

import defaultProfile from '@/assets/images/default-avatar.svg';
import Avatar from '@/components/common/Avatar';
import EmptyMessage from '@/components/EmptyMessage';
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

  const userIds = useMemo(() => {
    return Array.from(new Set(comments.map((comment) => comment.userId)));
  }, [comments]);

  const { userData: currentUserData } = useUserData(currentUser?.uid || null);
  const { usersData } = useMultipleUsersData(userIds);

  return (
    <div css={commentSectionStyle} data-testid="comment-section">
      <div css={commentContainerStyle}>
        <Avatar url={currentUserData?.photoURL} customStyle={avatarStyle} />
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
        {comments.length === 0 && (
          <EmptyMessage Icon={HiOutlineChatBubbleOvalLeft}>첫 댓글을 달아주세요!</EmptyMessage>
        )}
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
`;

const avatarStyle = css`
  width: 40px;
  height: 40px;
`;

const commentsListStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export default CommentSection;
