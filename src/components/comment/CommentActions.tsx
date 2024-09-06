// CommentActions.tsx
import { css } from '@emotion/react';

interface CommentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div css={commentActionsStyle}>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

const commentActionsStyle = css`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export default CommentActions;
