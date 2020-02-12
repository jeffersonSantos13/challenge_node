import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res){
    const schema = Yup.object({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Válida se o e-mail foi informado e é um e-mail valido
    if (!(await schema.isValid(req.body.email))) {
      return res.status(401).json({ error: 'E-mail não informado' });
    }

    // Verifia se a senha foi informado
    if (!(await schema.isValid(req.body.password))) {
      return res.status(401).json({ error: 'Senha não informado' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário ' });
    }

    if(!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id } = user;

    // Retorna que o Usuário está autenticado e o Token da requisição
    return res.json({
      user: {
        id,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),

    });
  }
}

export default new SessionController();
