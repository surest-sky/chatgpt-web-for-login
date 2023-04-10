import { NextFunction, Request, Response } from 'express';
import {Response as AppResponse} from '../types';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error('Global error caught:', err);

    if (res.headersSent) {
        return next(err)
    }

    res.status(500).json({
        message: 'Internal Server Error'
    } as AppResponse);
}

export default errorHandler;
