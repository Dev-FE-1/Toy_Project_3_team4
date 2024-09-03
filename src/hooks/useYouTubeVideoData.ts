import { useQuery } from '@tanstack/react-query';

import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';

export const useYouTubeVideoData = (videoId: string) => {
  return useQuery({
    queryKey: ['youtubeVideoData', videoId],
    queryFn: () => fetchYouTubeVideoData(videoId),
    staleTime: 1000 * 60 * 5,
  });
};
