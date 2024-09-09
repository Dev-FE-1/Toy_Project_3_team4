import { useQuery } from '@tanstack/react-query';

import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';

export const useYouTubeVideoData = (videoId: string | null) => {
  return useQuery({
    queryKey: ['youtubeVideoData', videoId],
    queryFn: () => {
      if (!videoId) {
        return Promise.reject(new Error('비디오 아이디가 제공되지 않았습니다.'));
      }
      return fetchYouTubeVideoData(videoId);
    },
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
