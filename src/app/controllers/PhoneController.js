import * as Yup from 'yup';

import Phone from '../models/Phone_numbers';

export default async (req, res) => {
  const schema = Yup.object().shape({
    phone_number: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(401).json({ error: 'Telefone não informado' });
  }

  const { phone_number } = req.body;

  // Verifica se o número de telefone existe
  const phone = await Phone.findOne({
    where: {
      phone_number,
      user_id: req.userId,
    },
  });

  // Caso não exista o telefone, insere
  if (!phone) {
    await Phone.create({
      phone_number,
      user_id: req.userId,
    });
  } else {
    await phone.update({ phone_number });
  };

  return res.json({
    success: true,
    next_end_point: 'address'
  });

};;
