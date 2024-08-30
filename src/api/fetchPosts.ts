import axios from 'axios';

import { Video, Comment } from '@/types/post';

import BASE_URL from './baseURL';

export const LIMIT = 2;
const USER_ID = 'LOqpUwROHvMHB2gJri49';

export interface TimelinePost {
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
  posts: TimelinePost[];
}

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTimeline = async ({ pageParam = '' }): Promise<TimelineResponse> => {
  const { data } = await api.get<TimelinePost[]>('/timeline', {
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
