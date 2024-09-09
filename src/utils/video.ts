export const makeVideoObj = (videoId: string) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return {
    videoId: videoId,
    thumbnailUrl: videoThumbnailUrl,
    videoUrl: videoUrl,
  };
};
