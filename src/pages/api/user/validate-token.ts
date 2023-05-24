
import { db } from '@/database';
import User from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt } from '@/utils';

type Data =
  { message: string; }
  | {
    token: string;
    user: {
      email: string;
      rol: string;
      name: string;
    };
  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJwt(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function checkJwt(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token || '');

  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(401).json({ message: 'No existe usuario con ese id' });
  }

  const { rol, name, _id, email } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email, rol, name
    }
  });
}
