import { Router } from 'express';
import UserController from '../controllers/user.controllers';

const router = Router();

const userController = new UserController();

router.post('/', userController.login.bind(userController));

export default router;