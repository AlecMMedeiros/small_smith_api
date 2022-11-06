import { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IProduct } from '../interfaces/IProduct';

export default class UserModel {
  private connection = mysql;

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  async getAll(): Promise<IProduct[]> {
    const [products] = await this.connection.execute<IProduct[] & RowDataPacket[]>(`
      SELECT id, name, amount FROM Trybesmith.Products`);

    return products;
  }
}