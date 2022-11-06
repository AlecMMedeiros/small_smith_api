import { IProduct } from '../interfaces/IProduct';
import ProductModel from '../models/product.model';

export default class UserService {
  public product = new ProductModel();

  public async create(productData: IProduct) {
    const newUser = await this.product.create(productData);

    return { code: 201, object: newUser };
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.product.getAll();
    return products;
  }
}