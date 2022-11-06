import { Request, Response } from 'express';
import OrdersService from '../services/orders.services';

export default class ProductController {
  public ordersService = new OrdersService();

  async listOrders(_req: Request, res: Response) {
    const orders = await this.ordersService.listOrders();

    res.status(200).json(orders);
  }
}