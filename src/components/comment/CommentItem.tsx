import { useState } from 'react';

import { css } from '@emotion/react';
import {
  HiOutlineEllipsisVertical,
  HiOutlineTrash,
  HiXMark,
  HiOutlinePencil,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

import CommentInput from '@/components/comment/CommentInput';
import Avatar from '@/components/common/Avatar';
import FitButton from '@/components/common/buttons/FitButton';
import OptionModal from '@/components/common/modals/OptionModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const modalOptions = [
    {
      label: '댓글 수정하기',
      Icon: HiOutlinePencil,
      onClick: () => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
        handleCloseModal();
      },
    },
    {
      label: '댓글 삭제하기',
      Icon: HiOutlineTrash,
      onClick: () => {
        handleDeleteComment(comment.id);
        handleCloseModal();
      },
    },
  ];

  return (
    <div css={commentStyle}>
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
            <>
              <button
                css={menuTriggerStyle}
                onClick={handleOpenModal}
                data-testid="comment-vertical-button"
              >
                <HiOutlineEllipsisVertical size={20} />
              </button>
              <OptionModal isOpen={isModalOpen} onClose={handleCloseModal} options={modalOptions} />
            </>
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
  color: ${theme.colors.darkestGray};
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
