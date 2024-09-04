export const fetchYouTubeVideoData = async (videoId: string) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error('비디오 정보를 가져오는데 실패했습니다.');
  }

  const data = await response.json();
  const videoDetails = data.items[0];

  return {
    title: videoDetails.snippet.title,
    creator: videoDetails.snippet.channelTitle,
    uploadDate: videoDetails.snippet.publishedAt,
    views: videoDetails.statistics.viewCount,
  };
};
