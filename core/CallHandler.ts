import { Request, Response, NextFunction, Application } from 'express';

export const CallHandler = (req: Request, res: Response, next: NextFunction, callback: any, app: Application) => {
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ err: err.message });
  });

  const response = callback(req, res, next);

  if (typeof response == 'object') {
    return res.json(response);
  } else {
    return res.send(response);
  }
}