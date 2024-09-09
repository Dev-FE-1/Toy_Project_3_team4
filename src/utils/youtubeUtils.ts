export const extractVideoId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const validateVideoId = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    );
    return response.ok;
  } catch (error) {
    console.warn('비디오 아이디 검증 실패', error);
    return false;
  }
};

const formatDecimal = (number: number): string => {
  return number.toFixed(1).replace('.0', '');
};

export const formatVideoViewCount = (count: number): string => {
  if (count < 1000) return `${count}회`;
  if (count < 10000) return `${formatDecimal(count / 1000)}천회`;
  if (count < 100000) return `${formatDecimal(count / 10000)}만회`;
  if (count < 100000000) return `${Math.floor(count / 10000)}만회`;
  return `${Math.floor(count / 100000000)}억회`;
};
