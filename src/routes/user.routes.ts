import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import NutritionistController from '../controller/NutritionistController';
import PatientController from '../controller/PatientController';

const userRoutes = Router();

const patientController = new PatientController();
const nutritionistController = new NutritionistController();

userRoutes.post('/', ensureAuthenticated, patientController.create);
userRoutes.post('/nutritionist', nutritionistController.create);
userRoutes.get('/:id', ensureAuthenticated, patientController.show);
userRoutes.get('/', ensureAuthenticated, patientController.list);
userRoutes.put('/', ensureAuthenticated, patientController.update);
userRoutes.delete('/:id', ensureAuthenticated, patientController.delete);

export default userRoutes;
