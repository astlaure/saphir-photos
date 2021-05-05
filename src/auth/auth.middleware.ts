import { NextFunction, Request, Response } from 'express';

const { APP_URL } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isUnauthenticated()) {
    return res.redirect(`${APP_URL}/login`);
  }
  return next();
}

export default auth;
