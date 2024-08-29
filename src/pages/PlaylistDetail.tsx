import BackHeader from '@/components/layout/header/BackHeader';
import PlaylistContents from '@/components/playlistDetail/PlaylistContents';
import PlaylistInfo from '@/components/playlistDetail/PlaylistInfo';
import { dummyPlaylist, dummyUser } from '@/utils/dummy';

const PlaylistDetailPage = () => {
  return (
    <>
      <BackHeader />
      <PlaylistInfo playlist={dummyPlaylist[4]} user={dummyUser} />
      <PlaylistContents videos={dummyPlaylist[4].videos} />
    </>
  );
};

export default PlaylistDetailPage;
