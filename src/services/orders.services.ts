import OrdersModel from '../models/orders.model';

export default class UserService {
  public order = new OrdersModel();

  public async listOrders() {
    const products = await this.order.listAllOrders();
    return products;
  }
}
