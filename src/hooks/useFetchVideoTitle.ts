import { useQuery } from '@tanstack/react-query';

import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';
import { extractVideoId } from '@/utils/youtubeUtils';

export const useFetchVideoTitle = (videoUrl: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['videoTitle', videoUrl],
    queryFn: async () => {
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        return await fetchYouTubeVideoData(videoId);
      } else {
        console.error('Invalid video URL');
      }
    },
  });
  if (isLoading) return '';
  if (isError) return '';
  return data?.title || '';
};
