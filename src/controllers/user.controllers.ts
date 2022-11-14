import { Request, Response } from 'express';
import UserService from '../services/user.services';
import { ILogin } from '../interfaces/ILogin';

export default class UserController {
  public userService = new UserService();

  async create(req: Request, res: Response) {
    const user = req.body;

    const userCreated = await this.userService.create(user);
    res.status(userCreated.code).json(userCreated.object || userCreated.message);
  }

  async login(req: Request<object, object, ILogin>, res: Response) {
    const { body } = req;
    
    const result = await this.userService.login(body);

    return res.status(result.code).json(result.message || result.object);
  }
}