
import { db } from '@/database';
import User from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';

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
      return registerUser(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name = '', email = '', password = '' } = req.body as { name: string; email: string; password: string; };

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres' });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'El correo electrónico no es válido' });
  }

  await db.connect();
  const user = await User.findOne({ email });

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    rol: 'client',
  });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'Ese correo ya está registrado' });
  }

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }

  const { _id, rol } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      rol,
      name
    }
  });
}
