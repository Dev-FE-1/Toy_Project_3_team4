import { useState, useEffect } from 'react';

import { getPostsFilterdLikes } from '@/api/fetchPosts';
import LogoHeader from '@/components/layout/header/LogoHeader';
import { PostModel } from '@/types/post';

const HomePage = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const timelinePosts = await getPostsFilterdLikes({
        userId: '43XSFCaxWQX0dVoGKWtbMoI6SyD2',
        count: 10,
        lastPostId: undefined,
      });
      setPosts(timelinePosts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <LogoHeader />
      {posts.map((post) => (
        <div key={post.postId}>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
};

export default HomePage;
