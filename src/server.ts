import 'reflect-metadata';
import express, { NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index.routes';

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', (request: Request, response: Response, next: NextFunction) => {
// 	console.log(`[${request.method}] - ${request.url}`);
// 	next();
// });

app.use(routes);

app.listen(3333, () => {
	console.log('Server Started');
});
