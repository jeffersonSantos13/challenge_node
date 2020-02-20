import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';
import { isValid, parseISO } from 'date-fns';

import User from '../models/Users';

class UserController {
  // Cadastrando usuário
  async store(req, res) {
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

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'E-mail informado já existe' });
    }

    const { id, email } = await User.create(req.body);

    return res.json({
      id,
      email
    });
  }

  /* Atualiza as informações do usuário */
  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      cpf: Yup.string(),
      birthday: Yup.string(),
    });

    // Verifica se o CPF é válido
    if (req.body.cpf && !cpf.isValid(req.body.cpf)) {
      return res.status(401).json({ error: 'CPF informado inválido' });
    }

    // Verifica se a data informada é válida
    if (req.body.birthday && !isValid(parseISO(req.body.birthday))) {
      return res.status(401).json({ error: 'Data informada inválida' });
    }

    const user = await User.findByPk(req.userId);

    // Atualização das informações do usuário
    await user.update(req.body);

    return res.status(200).json(req.nextEndPoint);
  }
}

export default new UserController();
