import { NextFunction, Request, Response } from 'express';
import User from '../users/user.model';

const { APP_URL } = process.env;

const hasRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as User | null)?.role === role) {
      return next();
    }
    return res.redirect(APP_URL!);
  };
};

export default hasRole;
