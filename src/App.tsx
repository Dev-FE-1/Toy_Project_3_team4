import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from '@/constants/path';
import ContainerLayout from '@/layouts/Container';
import RootLayout from '@/layouts/Root';
import AddPostPage from '@/pages/AddPost';
import HomePage from '@/pages/Home';
import NewPost from '@/pages/NewPost';
import PlaylistPage from '@/pages/Playlist';
import PlaylistDetailPage from '@/pages/PlaylistDetail';
import ProfilePage from '@/pages/Profile';
import ProfileEditPage from '@/pages/ProfileEdit';
import SearchPage from '@/pages/Search';
import SelectPliPage from '@/pages/SelectPli';
import SettingsPage from '@/pages/Settings';
import SignInPage from '@/pages/SignIn';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';

const router = createBrowserRouter([
  {
    element: <ContainerLayout />,
    children: [
      {
        path: PATH.SIGN_IN,
        element: <PublicRoute />,
        children: [{ index: true, element: <SignInPage /> }],
      },
      {
        path: PATH.SETTINGS,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <SettingsPage /> }],
      },
    ],
  },
  {
    path: PATH.HOME,
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: PATH.SEARCH,
            element: <SearchPage />,
          },
          {
            path: PATH.ADD_POST,
            children: [
              { index: true, element: <AddPostPage /> },
              { path: `${PATH.ADD_POST}/newPost`, element: <NewPost /> },
            ],
          },
          {
            path: PATH.SELECT_PLI,
            element: <SelectPliPage />,
          },
          {
            path: PATH.PLAYLIST,
            children: [
              { index: true, element: <PlaylistPage /> },
              {
                path: `${PATH.PLAYLIST}/:id`,
                element: <PlaylistDetailPage />,
              },
            ],
          },
          {
            path: PATH.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: PATH.PROFILE_Edit,
            element: <ProfileEditPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
