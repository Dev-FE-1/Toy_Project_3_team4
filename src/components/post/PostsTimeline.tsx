import { css } from '@emotion/react';

import Post from '@/components/post/Post';
import theme from '@/styles/theme';
import { PostModel } from '@/types/post';
export const PostsTimeLine = ({ posts }: { posts: PostModel[] }) => {
  return (
    <div css={timelineStyles} data-testid="timeline">
      {posts.map((post) => (
        <Post id={post.postId} key={post.postId} post={post} />
      ))}
    </div>
  );
};

const timelineStyles = css`
  max-width: ${theme.width.max};
  margin: 0 auto;
`;
