import { css } from '@emotion/react';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';

import defaultProfile from '@/assets/images/default-avatar.svg';
import Avatar from '@/components/common/Avatar';
import { useComments } from '@/hooks/useComments';
import { useMultipleUsersData } from '@/hooks/useMultipleUsersData';
import { useUserData } from '@/hooks/useUserData';
import { emptyMessageStyle } from '@/styles/GlobalStyles';

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
          <div css={emptyMessageStyle}>
            <HiOutlineChatBubbleOvalLeft />
            <p>첫 댓글을 달아주세요!</p>
          </div>
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
