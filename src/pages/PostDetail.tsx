import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getPostByPostId } from '@/api/fetchPosts';
import CommentSection from '@/components/comment/CommentSection';
import BackHeader from '@/components/layout/header/BackHeader';
import Post from '@/components/post/Post';
import { PostModel } from '@/types/post';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostModel | null>(null);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

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
      <BackHeader title="" onBackClick={handleBackClick} />
      {post && <Post id={postId || ''} post={post} isDetail={true} />}
      <CommentSection postId={postId || ''} />
    </>
  );
};

export default PostDetailPage;
