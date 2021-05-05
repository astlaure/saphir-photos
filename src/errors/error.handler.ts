import { NextFunction, Request, Response } from 'express';

const { APP_URL } = process.env;

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.redirect(`${APP_URL}/500`);
}

export default errorHandler;
