import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}