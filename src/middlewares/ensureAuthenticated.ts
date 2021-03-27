import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
	id: number;
	role: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JTW token inexistente. ', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);

		const { sub, role } = decoded as ITokenPayload;

		request.user = { id: sub, role };

		return next();
	} catch (err) {
		throw new AppError('JWT token Inválido', 401);
	}
}
