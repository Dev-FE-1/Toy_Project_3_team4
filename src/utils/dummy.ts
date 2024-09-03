import { PlaylistModel } from '@/types/playlist';
import { PostModel } from '@/types/post';

export const dummyPlaylist: PlaylistModel[] = [
  {
    playlistId: '0',
    userId: 'hi',
    title: '분류되지 않은 목록',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [],
  },
  {
    playlistId: '1',
    userId: 'hi',
    title: '내가 만든 플리',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
    ],
  },
  {
    playlistId: '2',
    userId: 'hi',
    title: '내가 만든 플리2',
    createdAt: '2024-08-22 12:36:55',
    isPublic: true,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
    ],
  },
  {
    playlistId: '3',
    userId: 'hi',
    title: '내가 만든 플리3',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
    ],
  },
  {
    playlistId: '4',
    userId: 'hi',
    title: '내가 만든 플리4',
    createdAt: '2024-08-22 12:36:55',
    isPublic: true,
    videos: [
      {
        videoId: '1234',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
      {
        videoId: '1235',
        userId: 'hi',
        title:
          'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1) NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1) NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1) NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
      {
        videoId: '123',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
      {
        videoId: '12',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
      {
        videoId: '1',
        userId: 'hi',
        title: 'NewJeans (뉴진스) ‘Supernatural’ Official MV (Part.1)',
        videoUrl: 'https://youtu.be/ZncbtRo7RXs?feature=shared',
        uploadDate: '2024-07-25',
        thumbnailUrl:
          'https://i.ytimg.com/vi/ZncbtRo7RXs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8KBJM5HXMkJspwKh50YcoaX1ATw',
        views: '2647만회',
        creator: 'NewJeans',
      },
    ],
  },
  {
    playlistId: '5',
    userId: 'hi',
    title: '내가 만든 플리5',
    createdAt: '2024-08-22 12:36:55',
    isPublic: false,
    videos: [],
  },
];

export const dummyUser = {
  userId: 'hi',
  displayName: 'hello',
  email: 'hello@gmail.com',
  photoURL:
    'https://lh3.googleusercontent.com/a/ACg8ocK_cTfrGYt-Y2Bs9WGspAR0xbJLYPVgw64TggUEPV5J8X9UG8k=s96-c',
};

export const dummyPosts: PostModel[] = [
  {
    postId: '1',
    userId: 'user1',
    playlistId: '1',
    playlistName: '내가 만든 플리',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user2', 'user3'],
    comments: [
      { commentId: 'comment1', userId: 'user2', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: [
      {
        videoId: 'sVTy_wmn5SU',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
      {
        videoId: 'Q3K0TOvTOno',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
    ],
  },
  {
    postId: '2',
    userId: 'user2',
    playlistId: '2',
    playlistName: '내가 만든 플리',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user1', 'user3', 'user4', 'user1', 'user3', 'user4', 'user1', 'user3', 'user4'],
    comments: [
      { commentId: 'comment1', userId: 'user1', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: [
      {
        videoId: 'sVTy_wmn5SU',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
      {
        videoId: 'Q3K0TOvTOno',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
    ],
  },
  {
    postId: '3',
    userId: 'RgkfFq9hLXPs3f9XYcPhkoERRfA3',
    playlistId: '3',
    playlistName: '내가 만든 플리',
    content:
      '00:00 NewJeans is loyal 01:54 NewJeans had a talk 🤍 15:17 NewJeans played Balance game 💛 20:38 NewJeans played a game 💚',
    createdAt: '2024-08-22 12:16:55',
    likes: ['user1', 'user3', 'user4', 'user1', 'user3', 'user4', 'user1', 'user3', 'user4'],
    comments: [
      { commentId: 'comment1', userId: 'user1', content: 'Great video!', likes: '5' },
      { commentId: 'comment2', userId: 'user3', content: 'Love NewJeans!', likes: '3' },
    ],
    video: [
      {
        videoId: 'Q3K0TOvTOno',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
      {
        videoId: 'sVTy_wmn5SU',
        title: 'NewJeans - OMG (Official MV)',
        videoUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      },
    ],
  },
];
