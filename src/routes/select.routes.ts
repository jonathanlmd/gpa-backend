import { Router } from 'express';
import SelectController from '../controller/SelectController';

const selectRoutes = Router();

const selectController = new SelectController();

selectRoutes.get('/city/:uf', selectController.selectCityByUF);

export default selectRoutes;
