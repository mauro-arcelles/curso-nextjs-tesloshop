import User from "@/models/user";
import { db } from ".";
import bcrypt from 'bcryptjs';

export const checkUserEmailPassowrd = async (email: string, password: string) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { rol, name, _id } = user;

  return {
    rol,
    name,
    _id,
    email: email.toLocaleLowerCase()
  };
};

// esta funcion crea o verifica el usuario de oauth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, rol } = user;

    return { _id, name, email, rol };
  }

  const newUser = new User({ email: oAuthEmail, name: oAuthName, rol: 'client', password: '@' });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, rol } = newUser;

  return { _id, name, email, rol };
};