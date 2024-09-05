import { useState, useEffect } from 'react';

import { css, Theme } from '@emotion/react';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  CommentModel,
} from '@/api/fetchComment';
import defaultProfile from '@/assets/images/default-avatar.svg';
import { useAuth } from '@/hooks/useAuth';
import { useMultipleUsersData } from '@/hooks/useMultipleUsersData';
import { formatCreatedAt } from '@/utils/date';

import UserInfo from '../user/UserInfo';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const currentUser = useAuth();

  // 모든 고유한 사용자 ID를 추출
  const userIds = Array.from(new Set(comments.map((comment) => comment.userId)));

  const { usersData } = useMultipleUsersData(userIds);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId, fetchComments]);

  const handleCreateComment = async () => {
    if (!currentUser) return;
    try {
      await createComment(postId, currentUser.uid, newCommentContent);
      setNewCommentContent('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      await updateComment(postId, commentId, editingContent);
      setEditingCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(postId, commentId);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div css={commentSectionStyle}>
      <h3 css={commentTitleStyle}>Comments</h3>
      <div css={newCommentStyle}>
        <textarea
          css={textareaStyle}
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button css={sendButtonStyle} onClick={handleCreateComment}>
          <HiOutlinePaperAirplane />
        </button>
      </div>
      <div css={commentsListStyle}>
        {comments.map((comment) => {
          const userData = usersData[comment.userId];
          return (
            <div key={comment.id} css={commentStyle}>
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
                    {comment.userId === currentUser?.uid && (
                      <div css={commentActionsStyle}>
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingContent(comment.content);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const commentSectionStyle = css`
  margin-top: 20px;
`;

const commentTitleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.large};
  margin-bottom: 16px;
`;

const newCommentStyle = css`
  display: flex;
  margin-bottom: 20px;
`;

const textareaStyle = (theme: Theme) => css`
  width: 100%;
  padding: 12px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: 8px;
  font-size: ${theme.fontSizes.small};
  resize: vertical;
`;

const sendButtonStyle = (theme: Theme) => css`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.black};
  }
`;

const commentsListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const commentStyle = css`
  display: flex;
  align-items: flex-start;
`;

const commentContentStyle = (theme: Theme) => css`
  margin-left: 12px;
  flex-grow: 1;
  font-size: ${theme.fontSizes.small};
`;

const commentDateStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.micro};
  color: ${theme.colors.darkGray};
  margin-top: 4px;
  display: block;
`;

const commentActionsStyle = css`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const editTextareaStyle = (theme: Theme) => css`
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

export default CommentSection;
