import * as Yup from 'yup';
import cep from 'cep-promise';

import Address from '../models/Address';

export default async (req, res) => {
  const schema = Yup.object().shape({
    cep: Yup.string().required(),
    street: Yup.string().required(),
    number: Yup.number().required(),
    complement: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(401).json({ error: 'Verifique se as informações do endereço estão corretas' });
  }

  // Verifica se o CEP informado é válido
  try {
    await cep(req.body.cep);
  } catch(err) {
    return res.status(401).json({ error: "CEP informado inválido" });
  }

  // Verifica se o número de telefone existe
  const address = await Address.findOne({
    where: {
      cep: req.body.cep,
      user_id: req.userId,
    },
  });

  // Caso não exista o telefone, insere
  if (!address) {

    const { cep, street, number, complement, city, state } = req.body

    await Address.create({
      cep,
      street,
      number,
      complement,
      city,
      state,
      user_id: req.userId,
    });
  } else {
    await address.update(req.body);
  };

  return res.json(req.nextEndPoint);

};;
