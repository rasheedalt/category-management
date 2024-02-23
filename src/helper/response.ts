import { Response } from 'express';
import HttpStatus from 'http-status-codes';

const apiResponse = <T>(
  res: any,
  payload: T,
  statusCode: number = HttpStatus.OK,
  errors: unknown = null,
): Response => {
  const isError = statusCode >= 400;
  const status = isError ? 'error' : 'success';
  const payloadKey = isError ? 'message' : 'data';

  const response = {
    status,
    [payloadKey]: payload,
    ...(isError && errors ? { data: errors } : {}),
  };

  return res.status(statusCode).json(response);
};

export default apiResponse;
