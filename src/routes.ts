import express from 'express';
const routes = express.Router();

// Express
import ExpressRouter from '@src/Router/ExpressRouter';

// Middlewares
import authMid from '@src/Factories/Auth';

// Controllers
import { defaultController } from '@src/Factories/Controllers';



routes.get('/', ExpressRouter(defaultController.index));


export default routes;