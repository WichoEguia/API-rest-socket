import { Request, Response, NextFunction } from 'express';


export const sayHello = (req: Request, res: Response, next: NextFunction) => {
  if (req.params.message === 'Error') {
    return res.status(500).json({
      ok: false,
      message: 'Mensaje de error desde Middleware'
    });
  }

  console.log('Hola desde el middleware');
  next();
}