declare module 'basecontroller-express' {
  import { Request, Response, NextFunction } from 'express';

  export class AppError extends Error {
    statusCode: number;
    status: string;
    isOptional: boolean;
    constructor(message: string, statusCode: number);
  }

  export function globalErrorHandle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void;

  export function successRes(
    res: Response,
    data: any,
    statusCode?: number
  ): Response;

  export class BaseController {
    constructor(model: any);
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
  }
}
