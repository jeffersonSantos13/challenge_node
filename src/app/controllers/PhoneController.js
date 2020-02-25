import * as Yup from 'yup';

import Phone_numbers from '../models/Phone_numbers';

export default async (req, res) => {
  const schema = Yup.object().shape({
    phone_number: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(401).json({ error: 'Telefone não informado' });
  }

  const { phone_number } = req.body;

  // Verifica se o número de telefone existe
  const phone = await Phone_numbers.findOne({
    where: {
      phone_number,
      user_id: req.userId,
    },
  });

  // Caso não exista o telefone, insere
  if (!phone) {
    await Phone_numbers.create({
      phone_number,
      user_id: req.userId,
    });
  } else {
    await phone.update({ phone_number });
  };

  return res.json(req.nextEndPoint);

};;
