import User from '../models/Users';

import RouterConfig from '../../config/router.config';

export default async (req, res, next) => {
  const [,,,url] = req.originalUrl.split('/');

  const user = await User.findByPk(req.userId);

  const { order } = RouterConfig[url.replace('-', '_')];

  // Ordem da execução das rotas
  for (let request of Object.keys(RouterConfig)) {
    if ( RouterConfig[request].order && order >= RouterConfig[request].order ) {

      // Verificar se os valores anteriores foram preenchidos
      if (order < RouterConfig[request].order && !user[request]) {
        return res.status(401).json({ error: `${request} não informado.` });
      }

      if (request && request == url.replace('-', '_')) {
        try {
          const { response } = RouterConfig[request];

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
  };

  return next();
}
