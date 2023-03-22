// External modules
import { Request, Response } from "express";

// Services
import { UserService } from "./user.service";

// Interfaces
import { Pagination } from "../shared/interfaces/pagination.interface";
import { UserFilters } from "./interfaces/user-filters";

export class UserController {
    private readonly service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async find(req: Request, res: Response) {
        try {
            const { email } = req.query as UserFilters;
            const { offset, limit } = req.query as unknown as Pagination;

            const users = await this.service.find(
                { email } satisfies UserFilters,
                { offset, limit } satisfies Pagination
            );

            return res.status(200).json({ status: true, data: users });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
