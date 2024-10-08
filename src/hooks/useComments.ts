import { useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { createComment, getComments, updateComment, deleteComment } from '@/api/fetchComment';
import { useAuth } from '@/hooks/useAuth';
import { CommentModel } from '@/types/comment';

export const useComments = (postId: string) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const currentUser = useAuth();

  const { data: comments = [], refetch } = useQuery<CommentModel[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  const createCommentMutation = useMutation({
    mutationFn: () => createComment(postId, currentUser?.uid || '', newCommentContent),
    onSuccess: () => {
      setNewCommentContent('');
      refetch();
    },
    onError: (error) => console.error('Error creating comment:', error),
  });

  const updateCommentMutation = useMutation({
    mutationFn: (commentId: string) => updateComment(postId, commentId, editingContent),
    onSuccess: () => {
      setEditingCommentId(null);
      refetch();
    },
    onError: (error) => console.error('Error updating comment:', error),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: () => refetch(),
    onError: (error) => console.error('Error deleting comment:', error),
  });

  const handleCreateComment = () => {
    if (!currentUser || !newCommentContent.trim() || isComposing) return;
    createCommentMutation.mutate();
  };

  const handleUpdateComment = (commentId: string) => {
    if (!editingContent.trim()) return;
    updateCommentMutation.mutate(commentId);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  return {
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
  };
};
