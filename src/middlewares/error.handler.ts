import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const logError: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("logError");
  console.log(err);
  next(err);
};
// function logError (err:error, req:Request, res:Response, next:NextFunction) {
//     console.log('logError');
//     console.log(err);
//     next(err);
// }

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("function -> errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

// function errorHandler(err, req, res, next) {
//     console.log('function -> errorHandler');
//     res.status(500).json({
//         message: err.message,
//         stack: err.stack,
//     });
// }

export { logError, errorHandler };
// module.exports = {
//     logError,
//     errorHandler
// }
