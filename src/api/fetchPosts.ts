import { getCurrentUserUid } from '@/api/firebaseAuth';
import { Video, Comment } from '@/types/post';

import { axiosApi, USER_ID, LIMIT } from './apiConfig';
export interface Post {
  id: string;
  userId: string;
  playlistId: string;
  playlistName: string;
  content: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
  video: Video[];
}

export interface TimelineResponse {
  posts: Post[];
}

export const fetchTimeline = async ({ pageParam = '' }): Promise<TimelineResponse> => {
  const { data } = await axiosApi.get<Post[]>('/timeline', {
    params: {
      userId: USER_ID,
      limit: LIMIT,
      lastPostId: pageParam,
    },
  });

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

export const fetchLikedPosts = async (postId: string): Promise<Post[]> => {
  try {
    const uid = getCurrentUserUid();
    const { data } = await axiosApi.post<Post[]>(`/posts/${postId}/like`, {
      userId: uid,
    });
    return data;
  } catch (error) {
    console.error('게시물 좋아요 실패', error);
    throw error;
  }
};
