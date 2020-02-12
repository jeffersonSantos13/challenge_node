import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  // Cadastrando usuário
  async store(req, res) {
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

    // Verifica se o e-mail foi informado
    if (!(await schema.isValid(req.body.password))) {
      return res.status(401).json({ error: 'Senha não informado' });
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

   // Válida se o e-mail foi informado e é um e-mail valido
   if (!(await schema.isValid(req.body.email))) {
      return res.status(401).json({ error: 'E-mail não informado' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
