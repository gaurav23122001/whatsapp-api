import { NextFunction, Request, Response } from 'express';
import { UserService } from '../database/services';
import APIError, { API_ERRORS } from '../errors/api-errors';
import { Locals } from '../types';

export default async function VerifyClientID(req: Request, res: Response, next: NextFunction) {
	const client_id = req.headers['client-id'] as string;

	if (!client_id) {
		return next(new APIError(API_ERRORS.USER_ERRORS.AUTHORIZATION_ERROR));
	}

	try {
		const [isValidAuth, _, user] = await UserService.isValidAuth(client_id);

		if (!isValidAuth) {
			console.log('Not Valid Auth');

			// WhatsappProvider.removeClient(client_id);
			return next(new APIError(API_ERRORS.USER_ERRORS.SESSION_INVALIDATED));
		}

		req.locals = {
			client_id,
			user,
		} as Locals;

		res.locals = {
			client_id,
		} as Locals;

		next();
	} catch (e: unknown) {
		return next(new APIError(API_ERRORS.USER_ERRORS.AUTHORIZATION_ERROR));
	}
}
