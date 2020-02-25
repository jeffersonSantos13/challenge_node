import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Users from '../models/Users';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res){
    const schema = Yup.object({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Válida se o e-mail e a senha foram informados é um e-mail valido
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'E-mail ou senha não informados' });
    }

    const { email, password } = req.body;

    const user = await Users.findOne({where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if(!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha inválida' });
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
