import { useEffect } from 'react';

import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import LogoHeader from '@/components/layout/header/LogoHeader';
import { PostsListLine } from '@/components/post/PostListLine';
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
  console.log(posts);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      <LogoHeader />
      <PostsListLine posts={posts} />
      <div ref={ref} css={loadingTrigger}>
        {getLoadingMessage(isFetchingNextPage, hasNextPage)}
      </div>
    </>
  );
};

export default HomePage;

const loadingTrigger = css`
  text-align: center;
  padding: ${theme.space.md};
  color: ${theme.colors.darkGray};
`;
