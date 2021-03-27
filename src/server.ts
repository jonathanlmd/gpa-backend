import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.routes';
import './container';
import AppError from './errors/AppError';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
	console.log(`[${request.method}] - ${request.url}`);
	next();
});

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	console.log('Erro', err);
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	return response.status(500).json({
		static: 'error',
		message: 'Erro interno.',
	});
});

process.on('SIGTERM', () => {
	process.exit();
});

app.listen(process.env.PORT, () => {
	console.log('Server Started');
});
