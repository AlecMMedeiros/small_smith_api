import { Router } from 'express';
import UserController from '../controllers/user.controllers';

const router = Router();

const userController = new UserController();

router.post('/login', userController.login.bind(userController));
router.post('/', userController.create.bind(userController));

export default router;