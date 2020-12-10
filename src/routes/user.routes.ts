import { Router } from 'express';
import PatientController from '../controller/PatientController';

const userRoutes = Router();

const patientController = new PatientController();

// userRoutes.get('/');
userRoutes.post('/', patientController.create);
// userRoutes.put('/');
// userRoutes.delete('/');

export default userRoutes;
