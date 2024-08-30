// src/routes/userRoutes.ts
import * as express from 'express';

import { UserService } from '../services/userService';

const router = express.Router();
const userService = new UserService();

export class CreateUserDto {
  displayName!: string;
  email!: string;
  photoURL?: string;
  bio?: string;
}

// 새 사용자 생성
router.post('/', async (req, res) => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === 'User with this email already exists') {
      res.status(409).send(error.message);
    } else {
      res.status(500).send('Error creating user');
    }
  }
});

// 사용자 정보 조회
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching user');
  }
});

// 사용자 정보 업데이트
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send('Error updating user');
    }
  }
});

// 사용자 삭제
router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

// 사용자 팔로우
router.post('/:id/follow', async (req, res) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) {
      return res.status(400).send('targetUserId is required to follow user');
    }
    await userService.followToUser(req.params.id, targetUserId);
    return res.status(200).send('User followed successfully');
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'User not found':
          return res.status(404).send(error.message);
        case 'Users cannot follow/unfollow themselves':
          return res.status(400).send(error.message);
        case 'User is already following the target user':
        case 'Target user is already followed by the user':
          return res.status(409).send(error.message);
        default:
          return res.status(500).send('Error following user');
      }
    } else {
      return res.status(500).send('Error following user');
    }
  }
});
// router.post('/:id/follow', async (req, res) => {
//   try {
//     const { targetUserId } = req.body;
//     await userService.followToUser(req.params.id, targetUserId);

//     if (!targetUserId) {
//       res.status(400).send('targetUserId required to follow user');
//       return;
//     }
//     res.status(200).send('User followed successfully');
//   } catch (error) {
//     if (error instanceof Error && error.message === 'User not found') {
//       res.status(404).send(error.message);
//     } else {
//       res.status(500).send('Error following user');
//     }
//   }
// });

router.post('/:id/unfollow', async (req, res) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) {
      return res.status(400).send('targetUserId is required to unfollow user');
    }
    await userService.unfollowUser(req.params.id, targetUserId);
    return res.status(200).send('User unfollowed successfully');
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'User not found':
          return res.status(404).send(error.message);
        case 'Users cannot follow/unfollow themselves':
          return res.status(400).send(error.message);
        case 'User is not following the target user':
        case 'Target user is not followed by the user':
          return res.status(409).send(error.message);
        default:
          return res.status(500).send('Error unfollowing user');
      }
    } else {
      return res.status(500).send('Error unfollowing user');
    }
  }
});

export default router;
