import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getALlAdmin = async (req: Request, res: Response) => {
    const result = await AdminService.getAllAdminFromDb(req.query);
    res.status(200).json({
        success: true,
        message: "Admin data fetched",
        data: result
    });
}

export const AdminController = {
    getALlAdmin
}