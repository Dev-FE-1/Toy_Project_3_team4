import { useEffect, Fragment } from 'react';

import { css } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import Post from '@/components/post/Posts';
import BASE_URL from '@/pages/home/baseURL';
import theme from '@/styles/theme';
import { PostModel } from '@/types/post';

const LIMIT = 10;
const USER_ID = 'LOqpUwROHvMHB2gJri49';

interface TimelineResponse {
  posts: PostModel[];
}

const api = axios.create({
  baseURL: BASE_URL,
});

const fetchTimeline = async ({ pageParam = '' }): Promise<TimelineResponse> => {
  const { data } = await api.get<PostModel[]>('/timeline', {
    params: {
      userId: USER_ID,
      limit: LIMIT,
      lastId: pageParam,
    },
  });

  // 서버 응답을 PostModel 형식에 맞게 변환
  const formattedData = data.map((post) => ({
    ...post,
    video: Array.isArray(post.video)
      ? post.video
      : [{ videoId: post.video, title: '', videoUrl: post.video }],
    comments: post.comments || [],
    playlistName: post.playlistName || '',
  }));

  return {
    posts: formattedData,
  };
};

const TimelineComponent: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['timeline'],
    queryFn: fetchTimeline,
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === LIMIT
        ? lastPage.posts[lastPage.posts.length - 1].postId
        : undefined,
    initialPageParam: '',
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div css={timelineStyles}>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.posts.map((post) => (
            <Post id={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} className="loading-trigger">
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No more posts'}
      </div>
    </div>
  );
};

const timelineStyles = css`
  max-width: ${theme.width.max};
  margin: 0 auto;
  padding: 16px;

  .loading-trigger {
    text-align: center;
    padding: 16px;
    color: ${theme.colors.darkGray};
  }
`;

export default TimelineComponent;
