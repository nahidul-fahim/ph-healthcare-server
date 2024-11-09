import { Request, Response } from "express";
import { userService } from "./user.service";


const createAdmin = async (req: Request, res: Response) => {
    const result = await userService.createAdmin();
}


export const userController = {
    createAdmin
}