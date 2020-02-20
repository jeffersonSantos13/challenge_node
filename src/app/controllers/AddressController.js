import * as Yup from 'yup';
import cep from 'cep-promise';

import Address from '../models/Address';

export default async (req, res) => {
  const schema = Yup.object().shape({
    cep: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(401).json({ error: 'Endereço não informado' });
  }

  const { cep } = req.body;

  // Verifica se o CEP informado é válido
  try {
    await cep(req.body.cep);
  } catch(err) {
    return res.status(401).json({ error: "CEP informado não encontrado" });
  }

  // Verifica se o número de telefone existe
  const address = await Address.findOne({
    where: {
      cep,
      user_id: req.userId,
    },
  });

  // Caso não exista o telefone, insere
  if (!address) {
    await Address.create({
      cep,
      user_id: req.userId,
    });
  } else {
    await address.update(req.body);
  };

  return res.json(req.nextEndPoint);

};;
