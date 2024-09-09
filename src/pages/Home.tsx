import { useEffect, memo } from 'react';

import { css } from '@emotion/react';
import { HiArrowUturnUp } from 'react-icons/hi2';
import { LuPartyPopper } from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';

import FitButton from '@/components/common/buttons/FitButton';
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
  const onClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isFetchingNextPage) {
    return <Spinner customStyle={spinnerStyle} />;
  }

  if (!hasNextPage) {
    return (
      <>
        <div css={completionMessageStyle}>
          <span>모든 포스트를 확인했습니다!</span>
          <LuPartyPopper size={20} />
        </div>
        <FitButton styleType="secondary" customStyle={topButtonStyle} onClick={onClickTop}>
          <HiArrowUturnUp /> 맨 위로 가기
        </FitButton>
      </>
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
      {posts.length === 0 ? <div css={noPostsMessageStyle}>포스트를 찾을 수 없습니다.</div> : null}
      <MemoizedPostsTimeLine posts={posts} />
      <div ref={ref} css={messageContainerStyle}>
        <LoadingMessage isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
      </div>
    </>
  );
};

const noPostsMessageStyle = css`
  text-align: center;
  padding: 24px;
  color: ${theme.colors.darkGray};
`;

const completionMessageStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-bottom: 16px;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;

  svg {
    stroke-width: 1.8;
  }
`;

const messageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const topButtonStyle = css`
  margin: 0 auto;
  font-weight: 600;
  padding: 12px 16px;
  margin-bottom: 16px;
  cursor: pointer;

  svg {
    stroke-width: 1.2;
  }
`;

const spinnerStyle = css`
  margin: 16px auto;
`;

export default HomePage;
