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
        meta: result.meta,
        data: result.data
    });
};


// get single from db by id
const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getAdminByIdFromDb(id);
    res.status(200).json({
        success: true,
        message: "Admin data fetched",
        data: result
    });
};

// update data
const updateData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.updateIntoDb(id, req.body);
    res.status(200).json({
        success: true,
        message: "Admin data updated",
        data: result
    });
};

// soft delete
const softDelete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDb(id);
    res.status(200).json({
        success: true,
        message: "Admin data deleted",
        data: result,
    });
};

export const AdminController = {
    getALlAdmin,
    getById,
    updateData,
    softDelete
}