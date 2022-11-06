import { Request, Response } from 'express';
import ProductService from '../services/product.services';

export default class ProductController {
  public ProductService = new ProductService();

  async create(req: Request, res: Response) {
    const product = req.body;

    const productCreated = await this.ProductService.create(product);
    res.status(productCreated.code).json(productCreated.object);
  }

  async getAll(_req: Request, res: Response) {
    const products = await this.ProductService.getAll();

    res.status(200).json(products);
  }
}