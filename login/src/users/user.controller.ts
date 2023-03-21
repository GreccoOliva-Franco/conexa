// External modules
import axios from "axios";
import { Request, Response } from "express";

export class UserController {
    async find(req: Request, res: Response) {
        try {
            const { data: users } = await axios.get(
                "http://ms-business/api/users",
                { headers: { 'Authorization': req.headers.authorization }, params: { ...req.query } },
            )
                .then((res) => res.data);

            return res.status(200).json({ status: true, data: users });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
