import { NextFunction, Request, Response } from 'express';

const keepAlive = (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  }
  next();
};

export default keepAlive;
