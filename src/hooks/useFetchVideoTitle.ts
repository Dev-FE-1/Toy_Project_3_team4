import { useEffect, useState } from 'react';

import { fetchYouTubeVideoData } from '@/api/fetchYouTubeVideoData';
import { extractVideoId } from '@/utils/youtubeUtils';

export const useFetchVideoTitle = (videoUrl: string) => {
  const [videoTitle, setVideoTitle] = useState<string>('');

  useEffect(() => {
    const fetchVideoTitle = async () => {
      const videoId = extractVideoId(videoUrl);
      if (videoId) {
        const videoData = await fetchYouTubeVideoData(videoId);
        setVideoTitle(videoData.title);
      } else {
        console.error('Invalid video URL');
        setVideoTitle('유효하지 않은 비디오 URL');
      }
    };

    if (videoUrl) {
      fetchVideoTitle();
    }
  }, [videoUrl]);

  return videoTitle;
};
