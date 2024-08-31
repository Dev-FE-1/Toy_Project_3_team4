import { useEffect, Fragment } from 'react';

import { css } from '@emotion/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { LIMIT } from '@/api/apiConfig';
import { fetchTimeline } from '@/api/fetchPosts';
import Post from '@/components/post/Posts';
import theme from '@/styles/theme';

const TimelineComponent: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['timeline'],
    queryFn: fetchTimeline,
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === LIMIT ? lastPage.posts[lastPage.posts.length - 1].id : undefined,
    initialPageParam: '',
  });

  const { ref, inView } = useInView({
    threshold: 0.95,
  });
  console.log(inView);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div css={timelineStyles}>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.posts.map((post) => (
            <Post
              id={post.id}
              post={{
                postId: post.id,
                userId: post.userId,
                playlistId: post.playlistId,
                playlistName: post.playlistName,
                content: post.content,
                createdAt: post.createdAt,
                likes: post.likes,
                comments: post.comments,
                video: post.video,
              }}
            />
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
    padding: 15px;
    color: ${theme.colors.darkGray};
  }
`;

export default TimelineComponent;
