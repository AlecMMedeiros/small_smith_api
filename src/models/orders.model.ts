import { RowDataPacket } from 'mysql2';
import mysql from './connection';

export default class UserModel {
  private connection = mysql;

  async listAllOrders() {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `SELECT Orders.id , userId,  JSON_ARRAYAGG(Products.id) as 'productsIds'
      FROM Trybesmith.Orders, Trybesmith.Products 
      WHERE Orders.id = orderId GROUP BY Orders.id`,
    );
    return result;
  }  
}