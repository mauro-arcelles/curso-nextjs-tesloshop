import { SHOP_CONSTANTS, db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string; } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    // case 'POST':
    // return createProduct();
    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { gender = 'all' } = req.query;

  let condition = {};
  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  res.status(200).json(products);
};
