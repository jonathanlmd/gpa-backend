import { Router } from 'express';
import TipController from '../controller/TipController';

const tipRoutes = Router();

const tipController = new TipController();

tipRoutes.post('/', tipController.create);
tipRoutes.get('/:id', tipController.show);
tipRoutes.get('/', tipController.list);
tipRoutes.put('/', tipController.update);
tipRoutes.delete('/:id', tipController.delete);

export default tipRoutes;
