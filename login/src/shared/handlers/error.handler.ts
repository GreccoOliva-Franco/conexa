// External modules
import { Request, Response } from "express";

export function endpointNotFoundHandler(req: Request, res: Response): Response {
    return res.status(404).json({
        status: false,
        error: {
            message: "Endpoint not implemented"
        }
    });
}