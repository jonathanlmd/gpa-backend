import { Router } from 'express';
import NutritionistController from '../controller/NutritionistController';
import PatientController from '../controller/PatientController';

const userRoutes = Router();

const patientController = new PatientController();
const nutritionistController = new NutritionistController();

userRoutes.post('/', patientController.create);
userRoutes.post('/nutritionist', nutritionistController.create);
userRoutes.get('/:id', patientController.show);
userRoutes.get('/', patientController.list);
userRoutes.put('/', patientController.update);
userRoutes.delete('/:id', patientController.delete);

export default userRoutes;
