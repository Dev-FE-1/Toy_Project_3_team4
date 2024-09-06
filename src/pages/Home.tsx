import { useEffect } from 'react';

import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import Spinner from '@/components/common/loading/Spinner';
import LogoHeader from '@/components/layout/header/LogoHeader';
import { PostsTimeLine } from '@/components/post/PostsTimeline';
import { useAuth } from '@/hooks/useAuth';
import { useFilteredPostsTimelinesQuery } from '@/hooks/useFilteredPostsTimelines';
import theme from '@/styles/theme';

const getLoadingMessage = (isFetchingNextPage: boolean, hasNextPage: boolean) => {
  if (isFetchingNextPage) {
    return <Spinner customStyle={spinnerStyle} />;
  }

  if (!hasNextPage) {
    return '모든 포스트를 확인했습니다!';
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
      {posts.length === 0 ? <div css={loadingTriggerStyle}>포스트를 찾을 수 없습니다.</div> : null}
      <PostsTimeLine posts={posts} />
      <div ref={ref}>{getLoadingMessage(isFetchingNextPage, hasNextPage)}</div>
    </>
  );
};

const loadingTriggerStyle = css`
  text-align: center;
  padding: 16px;
  color: ${theme.colors.darkGray};
`;

const spinnerStyle = css`
  margin: 0 auto;
`;

export default HomePage;
