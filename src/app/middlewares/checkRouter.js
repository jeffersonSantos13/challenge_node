import User from '../models/User';

export default async (req, res, next) => {
  const request = req.originalUrl;

  const user = await User.findByPk(req.userId);

  // Request CPF
  //if (request && request.includes('cpf')) {
    const { cpf } = user

    if (!user) {
      return res.status(401).json({ error: 'Preencha o CPF antes de processeguir com o cadastro' });
    }
  //}

  console.log(request);

  return next();
}
