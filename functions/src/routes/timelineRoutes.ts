import * as express from 'express';

import { PostService } from '../services/postService';

const router = express.Router();

const postService = new PostService();

// 타임라인 기능 구현
// 우선 유저가 팔로우한 유저들의 포스트들, 그리고 유저의 포스트들을 가져옵니다. 시간순으로 정렬합니다.
// 이후 lastPostId가 주어진 경우, 해당 포스트 이후의 포스트들을 가져옵니다.
// limit은 최대 100개로 제한합니다.(limit=10일 경우 유저당 10개의 포스트) 이후에는 lastPostId를 사용하여 추가로 가져올 수 있습니다.
// # GET {{baseUrl}}/posts/timeline?lastId=1&UserId=3234234234&limit=10 HTTP/1.1
// # GET {{baseUrl}}/posts/timeline?UserId=3234234234&limit=10 HTTP/1.1
router.get('/', async (req, res) => {
  try {
    const { userId, limit = 10, lastPostId } = req.query;
    if (!userId) {
      res.status(400).send('userId required to fetch posts');
      return;
    }
    const posts = await postService.getTimelinePosts(
      userId as string,
      Number(limit),
      lastPostId as string,
    );
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

export default router;
