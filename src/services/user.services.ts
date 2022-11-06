import jsonwebtoken from 'jsonwebtoken';
import Joi from 'joi';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';
import UserModel from '../models/user.model';

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': '"username" is required',
  }),
  password: Joi.string().required().messages({
    'any.required': '"password" is required',   
  }),
});

export default class UserService {
  public user = new UserModel();

  public jwt = jsonwebtoken;

  public generateToken(user: IUser) {
    const payload = { 
      username: user.username, classe: user.classe, level: user.level, passord: user.password,
    }; 
    return this.jwt
      .sign(payload, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1d' });
  }

  public async create(userData: IUser) {
    const newUser = await this.user.create(userData);
    const token = this.generateToken(newUser);
    return { code: 201, object: { token } };
  }

  public async login(loginBody: ILogin) {
    const { error } = loginSchema.validate(loginBody);
    if (error) return { code: 400, message: { message: error.details[0].message } };

    const user = await this.user.getUserByUsernameAndPassword(loginBody);

    if (user.length === 0) {
      return { code: 401, message: { message: 'Username or password invalid' } };
    }

    const token = this.generateToken(user[0]);

    return { code: 200, object: { token } };
  }
}