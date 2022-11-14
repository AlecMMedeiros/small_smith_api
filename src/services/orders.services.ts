import jsonwebtoken from 'jsonwebtoken';
import OrdersModel from '../models/orders.model';
import { ICreateOrder } from '../interfaces/ICreateOrder';
import ordersSchema from '../schemas/ordersSchema';

export default class OrdersService {
  public order = new OrdersModel();

  public jwt = jsonwebtoken;

  public async listOrders() {
    const products = await this.order.listAllOrders();
    return products;
  }

  public async create(token: string, body: ICreateOrder) {
    const secret: string = process.env.JWT_SECRET || '';
    let id: number;
    try {
      const validateToken = this.jwt.verify(token, secret) as { id: number, username:string };
      id = validateToken.id;
   
      const { error } = ordersSchema.validate(body);
      if (error) {      
        const code = error.message.includes('required') ? 400 : 422;
        return { code, message: { message: error.details[0].message } };
      }
      const newOrder = await this.order.create(id, body);
      return { code: 201, object: newOrder };   
    } catch (error) { return { code: 401, message: { message: 'Invalid token' } }; }     
  }
}
