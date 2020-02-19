import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Middlewares
import authMiddleware from './app/middlewares/auth';
import checkRouter from './app/middlewares/checkRouter';

const routes = new Router();

// Rotas

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/cpf', checkRouter, (req, res) => {
  return res.send('Costa gay');
});

// Verifica se o usuário está autenticado
routes.use(authMiddleware);

routes.put('/api/v1/cpf', UserController.update);

routes.put('/api/v1/full-name', UserController.update);

export default routes;
