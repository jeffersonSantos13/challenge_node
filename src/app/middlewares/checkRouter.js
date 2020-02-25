import RouterConfig from '../../config/router.config';
import TableRelationConfig from '../../config/table.relation.config';

import User from '../models/Users';

export default async (req, res, next) => {
  let [,,,url] = req.originalUrl.split('/');
  url = url.replace('-', '_');

  const user = await User.findByPk(req.userId, {
    attributes: ['cpf', 'birthday', 'first_name', 'last_name'],
    include: [
      {
        association: 'phone_numbers',
        attributes: ['phone_number']
      },
      {
        association: 'addresses',
        attributes: ['cep','street','number','complement','city','state']
      }
    ]
  });

  const { order: requestOrder } = RouterConfig[url];

  /**
   * Controle que verifica se a ordem da rota foi preenchida corretamente
   * A ordem é verificada com base do router.config que retorna um objeto
   * com as respectivas ordem e a próxima rota que pode ser chamada
   */
  for (let request of Object.keys(RouterConfig)) {
    let { order: endPointOrder } = RouterConfig[request]

    // Verifica se todas as rotas foram executadas na ordem
    if (endPointOrder < requestOrder) {
      if (TableRelationConfig[request] != undefined) {
        if(Object.keys(user[TableRelationConfig[request].name]).length <= 0) {
          return res.status(401).json({ error: `${request} não informado.` });
        }
      } else {
        if ((!user[request]) || (!isNaN(user[request]) && user[request] <= 0)) {
          return res.status(401).json({ error: `${request} não informado.` });
        }
      }
    } else {

      try {
        const { response } = RouterConfig[url];

        req.nextEndPoint = {
          success: true,
          next_end_point: response,
        };
      } catch (err) {
        req.nextEndPoint = {
          success: true
        };
      }

    }

  }

  return next();
}
