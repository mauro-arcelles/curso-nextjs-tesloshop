
import { db } from '@/database';
import User from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
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
    case 'POST':
      return loginUser(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '' } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res.status(401).json({ message: 'Email o contraseña inválidos' });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(401).json({ message: 'Email o contraseña inválidos' });
  }

  const { rol, name, _id } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email, rol, name
    }
  });
}
