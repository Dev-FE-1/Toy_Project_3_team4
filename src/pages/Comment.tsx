import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { getPostByPostId } from '@/api/fetchPosts';
import CommentSection from '@/components/comment/CommentSection';
import BackHeader from '@/components/layout/header/BackHeader';
import Post from '@/components/post/Post';
import { PostModel } from '@/types/post';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Comment = () => {
  const query = useQuery();
  const postId = query.get('postId');
  const [post, setPost] = useState<PostModel | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      const post = await getPostByPostId({ postId });
      setPost(post as PostModel | null);
    };

    fetchPost();
  }, [postId]);

  return (
    <>
      <BackHeader title="" />
      {post && <Post id={postId || ''} post={post} />}
      <CommentSection postId={postId || ''} />
    </>
  );
};
