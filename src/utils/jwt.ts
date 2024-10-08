import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla para el token');
  }

  return jwt.sign(
    { _id, email },
    process.env.JWT_SECRET_SEED,
    { expiresIn: '30d' }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla para el token');
  }

  if (token.length <= 10) {
    return Promise.reject('Token no válido');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) {
          reject(err);
        }

        const { _id } = payload as { _id: string; };

        resolve(_id);
      });
    } catch (error) {
      console.log(error)
      reject('Token no válido');
    }
  }
  );
};