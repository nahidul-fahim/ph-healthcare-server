import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";

const getALlAdmin = async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'name', 'email', 'contactNumber']);
    const result = await AdminService.getAllAdminFromDb(filters);
    res.status(200).json({
        success: true,
        message: "Admin data fetched",
        data: result
    });
}

export const AdminController = {
    getALlAdmin
}