import { IProduct } from '../interfaces/IProduct';
import ProductModel from '../models/product.model';
import productSchema from '../schemas/products.schema';

export default class UserService {
  public product = new ProductModel();

  public async create(productData: IProduct) {
    const { error } = productSchema.validate(productData);
    if (error) {      
      const code = error.message.includes('required') ? 400 : 422;
      return { code, message: { message: error.details[0].message } };
    } 
    const newUser = await this.product.create(productData);

    return { code: 201, object: newUser };
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.product.getAll();
    return products;
  }
}