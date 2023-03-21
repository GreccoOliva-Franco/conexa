// External modules
import { NextFunction, Request, Response } from 'express';

export function validateRequest(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { body, params, query } = req;

        const { errors } = schema.validate({ body, params, query }, { abortEarly: false });
        if (!errors) return next();

        return res.status(400).json({
            status: false,
            errors: errors.details.map((error: any) => error.hint),
        });
    };
}