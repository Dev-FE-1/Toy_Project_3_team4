import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CommentSection from '@/components/comment/commentSection';
import { PATH } from '@/constants/path';
import ContainerLayout from '@/layouts/Container';
import RootLayout from '@/layouts/Root';
import AddPostPage from '@/pages/AddPost';
import FollowPage from '@/pages/Follow';
import HomePage from '@/pages/Home';
import NewPost from '@/pages/NewPost';
import PlaylistPage from '@/pages/Playlist';
import PlaylistDetailPage from '@/pages/PlaylistDetail';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ProfilePage from '@/pages/Profile';
import ProfileEditPage from '@/pages/ProfileEdit';
import SearchPage from '@/pages/Search';
import SelectPliPage from '@/pages/SelectPli';
import SettingsPage from '@/pages/Settings';
import SignInPage from '@/pages/SignIn';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';

const NotFound = () => (
  <div>
    <h1>페이지가 존재하지 않아요</h1>
    <h2>
      이 화면은 존재하지 않거나 접근할 수 없는 경로에 접근하는 경우에 표시됩니다. 정확한 경로에
      접근하셨는지, 로그인 상태인지, 비정상적인 접근을 한 것은 아닌지 확인해보시길 바랍니다.
    </h2>
  </div>
);

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
        path: PATH.PRIVACY_POLICY,
        element: <PrivacyPolicyPage />,
      },
      {
        path: PATH.TERM_OF_SERVICE,
        element: <TermsOfServicePage />,
      },
      {
        path: PATH.SETTINGS,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <SettingsPage /> }],
      },
      {
        path: PATH.PROFILE_EDIT,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <ProfileEditPage /> }],
      },
      {
        path: PATH.FOLLOW,
        element: <ProtectedRoute />,
        children: [{ index: true, element: <FollowPage /> }],
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
            path: PATH.COMMENT,
            element: <CommentSection />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
