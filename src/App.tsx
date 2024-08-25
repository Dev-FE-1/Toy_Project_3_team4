import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/Root';
import AddPostPage from '@/pages/AddPost';
import HomePage from '@/pages/Home';
import PlaylistPage from '@/pages/Playlist';
import ProfilePage from '@/pages/Profile';
import SearchPage from '@/pages/Search';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: PATH.SEARCH,
            element: <SearchPage />,
          },
          {
            path: PATH.ADD_POST,
            element: <AddPostPage />,
          },
          {
            path: PATH.PLAYLIST,
            element: <PlaylistPage />,
          },
          {
            path: PATH.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
