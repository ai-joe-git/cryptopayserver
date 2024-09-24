import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'GET':
        const connection = await connectDatabase();
        const id = req.query.id
        const storeId = req.query.store_id;
        const network = req.query.network;

        console.log("idd", id, storeId, network)
        const query = 'SELECT * FROM invoices where order_id = ? and store_id = ? and network = ? and status = ?';
        const values = [id, storeId, network, 1];
        const [rows] = await connection.query(query, values);
        return res.status(200).json({ message: '', result: true, data: rows });
      case 'POST':
        break;
      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}