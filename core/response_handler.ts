import { Application, Request, Response, NextFunction } from "express";

export function responseHandler(app: Application) {
  function wrapAsync(fn: Function) {
    return function (req: any, res: any, next: any) {
      fn(req, res, next).catch(next);
    };
  }

  app.get('*', wrapAsync(async function (req: Request, res: Response) {
    await new Promise(resolve => setTimeout(() => resolve(), 50));
    throw new Error('Oppss!! Something went wrong');
  }));

  app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
    res.json({
      ok: false,
      message: error.message
    });
  });
}