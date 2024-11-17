import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getALlAdmin = async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await AdminService.getAllAdminFromDb(filters, options);
    res.status(200).json({
        success: true,
        message: "Admin data fetched",
        data: result
    });
}

export const AdminController = {
    getALlAdmin
}