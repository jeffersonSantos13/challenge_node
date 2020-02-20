import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import PhoneController from './app/controllers/PhoneController';
import AddressController from './app/controllers/AddressController';

// Middlewares
import authMiddleware from './app/middlewares/auth';
import checkRouter from './app/middlewares/checkRouter';

const routes = new Router();

// Rotas

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Verifica se o usuário está autenticado
routes.use(authMiddleware);

// Atualização do CPF
routes.put('/api/v1/cpf', checkRouter, UserController.update);

// Atualização do nome
routes.put('/api/v1/full-name', checkRouter, UserController.update);

// Atualização da data de aniversário
routes.put('/api/v1/birthday', checkRouter, UserController.update);

// Atualização / Insere o número de telefone
routes.put('/api/v1/phone-number', checkRouter, PhoneController);

// Atualização / Insere o endereço
routes.put('/api/v1/address', checkRouter, AddressController);

export default routes;
