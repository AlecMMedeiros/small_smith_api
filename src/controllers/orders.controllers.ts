import { Request, Response } from 'express';
import OrdersService from '../services/orders.services';

export default class OrdersController {
  public ordersService = new OrdersService();

  async listOrders(_req: Request, res: Response) {
    const orders = await this.ordersService.listOrders();

    res.status(200).json(orders);
  }

  public async create(req: Request, res: Response) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Token not found' });

    const newOrderReturn = await this.ordersService.create(auth, req.body);
    return res.status(newOrderReturn.code).json(newOrderReturn.object || newOrderReturn.message);
  }
}