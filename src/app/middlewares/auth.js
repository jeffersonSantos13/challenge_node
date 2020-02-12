import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /* Desestruturando o array pegando a partir da segunda posição */
  const [, token] = authHeader.split(' ');

  try {
    //Passando a função promisify convertendo a função verify no padrão await e async
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch(err){
    return res.status(401).json({ error: 'Token invalid' });
  }
};
