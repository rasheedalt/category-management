import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import apiResponse from './response';

export default function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  console.error(`Internal Error --> `, err);

  const message = err.message || 'Internal server error';

  return apiResponse<string>(res, message, 500);
}
