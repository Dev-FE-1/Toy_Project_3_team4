import { useEffect } from 'react';

import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import LogoHeader from '@/components/layout/header/LogoHeader';
import { PostsTimeLine } from '@/components/post/PostsTimeline';
import { useAuth } from '@/hooks/useAuth';
import { useFilteredPostsTimelinesQuery } from '@/hooks/useFilteredPostsTimelines';
import theme from '@/styles/theme';

const getLoadingMessage = (isFetchingNextPage: boolean, hasNextPage: boolean) => {
  if (isFetchingNextPage) {
    return 'Loading more posts...';
  }

  if (hasNextPage) {
    return 'No more posts';
  }

  return '';
};

const HomePage = () => {
  const user = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFilteredPostsTimelinesQuery({
    userId: user?.uid || '',
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <LogoHeader />
      {posts.length === 0 ? <div css={loadingTrigger}>No posts found</div> : null}
      <PostsTimeLine posts={posts} />
      <div ref={ref} css={loadingTrigger}>
        {getLoadingMessage(isFetchingNextPage, hasNextPage)}
      </div>
    </>
  );
};

export default HomePage;

const loadingTrigger = css`
  text-align: center;
  padding: 16px;
  color: ${theme.colors.darkGray};
`;
