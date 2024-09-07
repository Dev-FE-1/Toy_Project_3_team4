import { useEffect, memo } from 'react';

import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import Spinner from '@/components/common/loading/Spinner';
import LogoHeader from '@/components/layout/header/LogoHeader';
import { PostsTimeLine } from '@/components/post/PostsTimeline';
import { useAuth } from '@/hooks/useAuth';
import { useFilteredPostsTimelinesQuery } from '@/hooks/useFilteredPostsTimelines';
import theme from '@/styles/theme';

const MemoizedPostsTimeLine = memo(PostsTimeLine);

const LoadingMessage = ({
  isFetchingNextPage,
  hasNextPage,
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}) => {
  if (isFetchingNextPage) {
    return <Spinner customStyle={spinnerStyle} />;
  }

  if (!hasNextPage) {
    return (
      <div css={completionMessageStyle}>
        <span>모든 포스트를 확인했습니다! </span>
      </div>
    );
  }

  return null;
};

const HomePage = () => {
  const user = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFilteredPostsTimelinesQuery({
      userId: user?.uid || '',
    });

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Spinner customStyle={spinnerStyle} />;
  }

  return (
    <>
      <LogoHeader />
      {posts.length === 0 && !isLoading ? (
        <div css={noPostsMessageStyle}>
          <span>😔</span> 포스트를 찾을 수 없습니다. <span>😔</span>
        </div>
      ) : (
        <MemoizedPostsTimeLine posts={posts} />
      )}
      <div ref={ref}>
        <LoadingMessage isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
      </div>
    </>
  );
};

const noPostsMessageStyle = css`
  text-align: center;
  padding: 24px;
  color: ${theme.colors.darkGray};
  font-size: 18px;
  background-color: ${theme.colors.lightGray};
  border-radius: 8px;
  margin: 16px;
`;

const completionMessageStyle = css`
  text-align: center;
  padding: 16px;
  color: ${theme.colors.darkGray};
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  margin: 16px;
`;

const spinnerStyle = css`
  margin: 16px auto;
`;

export default HomePage;
