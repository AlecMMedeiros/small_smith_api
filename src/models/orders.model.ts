import { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { ICreateOrder } from '../interfaces/ICreateOrder';

export default class OrdersModel {
  private connection = mysql;

  public async listAllOrders() {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `SELECT Orders.id , userId,  JSON_ARRAYAGG(Products.id) as 'productsIds'
      FROM Trybesmith.Orders, Trybesmith.Products 
      WHERE Orders.id = orderId GROUP BY Orders.id`,
    );
    return result;
  }

  public async create(userId: number, data: ICreateOrder) {
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>('INSERT INTO Trybesmith.Orders (userId) VALUES (?)', [userId]);

    await Promise.all(data.productsIds.map((productId) => this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [insertId, productId],
    )));
  
    const result = { userId, ...data };
    return result;
  } 
}
