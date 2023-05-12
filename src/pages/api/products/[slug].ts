import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string; } | { product: IProduct; };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const { slug } = req.query;
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(404).json({ message: 'Product Not Found' });
  }

  res.status(200).json({ product });
}
